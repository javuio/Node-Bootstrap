DROP PROCEDURE IF EXISTS permissions_selectbyRoleId;

DELIMITER $$

CREATE  PROCEDURE `permissions_selectbyRoleId`(
	  _roleId int(11),
	  _roleName varchar(36)
)
begin
	if(_roleId is null) then
	set _roleId = (select roleId from roles where name = _roleName ) ;
	end if;
	select pr.* from rolepermissions as rp 
	inner join 
	permissions as pr 
	on  pr.permissionId = rp.permissionId 
    where rp.roleId = _roleId ;
end;