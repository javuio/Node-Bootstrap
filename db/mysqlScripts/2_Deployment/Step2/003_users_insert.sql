DROP PROCEDURE IF EXISTS users_insert;

DELIMITER $$

CREATE  PROCEDURE `users_insert`(
	_username nvarchar(60), _password nvarchar(150), _loginMethod varchar(3),
	_firstName nvarchar(150), _lastName nvarchar(150),
	_roleName varchar(150)
)
insertScope:begin
	declare _userToken varchar(36);
	declare _createdUserId int(11);
	
	set _userToken = UUID();
	if not (_loginMethod = 'fb' or _loginMethod = 'std') then
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'badLoginMethod';
	end if;

	START TRANSACTION;

	if exists(SELECT 1 FROM users where username = _username limit 1) then
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'duplicateUsername';
		rollback;
		leave insertScope;
	else		
		insert into users
			(username, password, loginMethod, firstName, lastName, userToken, accessToken, createdOn)
		values
			(_username, _password, _loginMethod, _firstName, _lastName, _userToken, UUID(), UTC_TIMESTAMP());
		select LAST_INSERT_ID() as userId, _userToken as userToken;
	end if;
	
	set _createdUserId = LAST_INSERT_ID();
	
	if (_roleName is not null and _createdUserId is not null) then
		call userRoles_insert(_createdUserId, null,null, _roleName);
	end if;
	
	commit;
end