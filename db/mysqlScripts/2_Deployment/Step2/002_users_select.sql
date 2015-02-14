DROP PROCEDURE IF EXISTS users_select;

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_select`(
	_userId INT(11),
	_userToken char(36),
	_accessToken char(36),
	_username varchar(60),
	_password varchar(250),
	_ipAddress varchar(45),
	_showDeleted bit,
	_showActiveOnly bit
)
BEGIN
	set @selectedUserId = null;
	select @selectedUserId :=  userId as userId, username, loginMethod, isActive, firstName, lastName,
	address, city, state, zip, userToken, lastUpdatedOn, lastUpdatedBy, createdOn, createdBy, deletedOn, deletedBy,
	case 
		when (_password is null) then null
		when (_password is not null)  then accessToken
	end
	as accessToken 
	from users where
		(
			(userId = _userId and userToken = _userToken and (_username is null and _password is null )) or
			(username = _username and password = _password) or
			(userToken = _userToken and accessToken = _accessToken)
		) and
		(_showDeleted = 1 or deletedOn is null) and
		(_showActiveOnly = 0 or isActive = 1);

	if (_username is not null and @selectedUserId is null) then
		insert into loginAttempts
			  (username, timestamp, ipAddress)
		values
			(_username, UTC_TIMESTAMP(), _ipAddress);
	end if;
	
	if (_username is not null) then
		set @lateBadLoginAttempts = 0;
		select @lateBadLoginAttempts:= count(loginAttemptId) from loginAttempts 
			where username = _username  and timestamp > (UTC_TIMESTAMP() - INTERVAL 5 MINUTE);
		if (@lateBadLoginAttempts >= 20) then
			SIGNAL SQLSTATE '45000'
				SET MESSAGE_TEXT = 'userLocked';
		end if;
	end if;
END