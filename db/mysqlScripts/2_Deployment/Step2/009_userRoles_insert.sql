DROP PROCEDURE IF EXISTS userRoles_insert;

DELIMITER $$

CREATE  PROCEDURE `userRoles_insert`(
	  _userId int(11),
	  _email varchar(160),
	  _roleId int(11),
	  _roleName varchar(150)
)
begin	
	if (_userId is null) then
		set _userId = (select userID from users where email = _email limit 1);
	end if;
	
	if (_userId is null) then 
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'User not found';
	end if;

	if (_roleId is null) then
		set _roleId = (select roleId from roles where name = _roleName limit 1);
	end if;

	if (_roleId is null) then 
	SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'Role not found';
	end if;
		
	INSERT IGNORE into userRoles
		(userId,roleId)
		values (_userId,_roleId);
end;