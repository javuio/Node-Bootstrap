DROP PROCEDURE IF EXISTS users_delete;

DELIMITER $$

CREATE  PROCEDURE `users_delete`(
	_username nvarchar(60), _password nvarchar(150), _deletedBy int(11)
)
begin
	update users
		set deletedOn = UTC_TIMESTAMP(), deletedBy = _deletedBy, isActive = 0
		where username = _username and password = _password;
	if ROW_COUNT() = 0 then
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'recordNotFound';
	end if;
end
