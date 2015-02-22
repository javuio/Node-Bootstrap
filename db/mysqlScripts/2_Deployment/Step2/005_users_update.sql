DROP PROCEDURE IF EXISTS users_update;

DELIMITER $$

CREATE PROCEDURE `users_update`(
	_userToken nvarchar(36), _firstName nvarchar(150), _lastName nvarchar(150),
	_address nvarchar(250), _city nvarchar(250), _state varchar(3), _zip varchar(15), _isActive bit, lastUpdatedBy int(11)
)
begin
	update users
		set firstName = _firstName, lastName = _lastName, address = _address, city = _city,
		state = _state, zip = _zip, isActive = ifNull(_isActive,isActive), lastUpdatedOn = UTC_TIMESTAMP(), lastUpdatedBy = lastUpdatedBy
		where userToken = _userToken;
	if ROW_COUNT() = 0 then
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'recordNotFound';
	end if;
end
