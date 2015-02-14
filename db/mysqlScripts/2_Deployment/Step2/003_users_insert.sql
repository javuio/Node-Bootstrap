DROP PROCEDURE IF EXISTS users_insert;

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_insert`(
	_username nvarchar(60), _password nvarchar(150), _loginMethod varchar(3),
	_firstName nvarchar(150), _lastName nvarchar(150),
	_address nvarchar(250), _city nvarchar(250), _state varchar(3), _zip varchar(15) , _roleName varchar(150)
)
begin
	declare _userToken varchar(36);
	declare _createdUserId int(11);
	
	set _userToken = UUID();
	if not (_loginMethod = 'fb' or _loginMethod = 'std') then
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'badLoginMethod';
	end if;
	if exists(SELECT 1 FROM users where username = _username limit 1) then
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'duplicateUsername';
	else
		insert into users
			(username, password, loginMethod, firstName, lastName, address, city, state, zip, userToken, accessToken, createdOn) 
		values
			(_username, _password, _loginMethod, _firstName, _lastName, _address, _city, _state, _zip, _userToken, UUID(), UTC_TIMESTAMP());
		select LAST_INSERT_ID() as userId, _userToken as userToken;
	end if;
	
	set _createdUserId = LAST_INSERT_ID();
	
	if (_roleName is not null) then
		call userRoles_insert(_createdUserId, null, _roleName);
	end if;
	
end