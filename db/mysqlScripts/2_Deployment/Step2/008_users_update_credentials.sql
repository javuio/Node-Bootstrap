DROP PROCEDURE IF EXISTS users_update_credentials;

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_update_credentials`(
	_username nvarchar(60), _password nvarchar(150),
	_newUsername nvarchar(60), _newPassword nvarchar(150)
)
begin
	
	update users
		set username = _newUsername, password = _newPassword, lastUpdatedOn = UTC_TIMESTAMP(), accessToken = UUID()
		where username = _username and password = _password;
		
	select userToken, accessToken from users
	where username = _username and password = _password;
		
	if ROW_COUNT() = 0 then
	SIGNAL SQLSTATE '45000'
	SET MESSAGE_TEXT = 'recordNotFound';
	end if;
end
