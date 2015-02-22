DROP PROCEDURE IF EXISTS users_checkPermissions;

DELIMITER $$

CREATE  PROCEDURE `users_checkPermissions`(
	  _permissionName VARCHAR(150),
	  _userToken varchar(36),
	  _userId int(11)
)
begin
	
	if(_userId is null) then
	set _userId = (select userId from users where userToken = _userToken) ; 
	end if;

	select true from userRoles as ur
	inner join rolePermissions as rp 
	on ur.roleId = rp.roleId 
	and ur.userId =_userId 
	inner join permissions as pr 
    on pr.permissionId = rp.permissionId 
    and pr.name=_permissionName
	limit 1; 
end;