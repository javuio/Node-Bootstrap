DROP PROCEDURE IF EXISTS  users_reset_password;

DELIMITER $$

CREATE  PROCEDURE `users_reset_password`(
	_userId int(11),
	_userToken char(36),
	_password varchar(250)
)
begin
	update users
	set password = _password, lastUpdatedOn = UTC_TIMESTAMP(), accessToken = UUID()
	where userId = _userId and userToken = _userToken;

	select username,userToken, userId, accessToken
	from users
	where userId = _userId and userToken = _userToken;
	
	if ROW_COUNT() = 0 then
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'recordNotFound';
	end if;
end