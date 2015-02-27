DROP PROCEDURE IF EXISTS users_select_by_username;

DELIMITER $$

CREATE  PROCEDURE `users_select_by_username`(
	_username varchar(60),
	_showDeleted bit,
	_showActiveOnly bit
)
BEGIN
	
	select  userId, username, loginMethod, isActive, firstName, lastName,
	userToken, lastUpdatedOn, lastUpdatedBy, createdOn, createdBy, deletedOn, deletedBy
	from users where
    (username = _username) and
		(_showDeleted = 1 or deletedOn is null) and
		(_showActiveOnly = 0 or isActive = 1);
END$$