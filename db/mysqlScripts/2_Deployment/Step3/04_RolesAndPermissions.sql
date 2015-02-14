set @PublicApplicationAccess = 1;
set @ControlPanelAccess = 2;
set @AdminPortalAccess = 3;

set @CommonUser = 1;
set @ControlPanelUser = 2;
set @AdminPortalUser = 3;

/****************
Insert Common Permissions
****************/

INSERT IGNORE into permissions	(permissionId,name,description)
values	(@PublicApplicationAccess, "PublicApplicationAccess", "Authenticated User Public App/Site General Access");


INSERT IGNORE into permissions	(permissionId,name,description)
values	(@ControlPanelAccess, "ControlPanelAccess", "General Access to Control Panel");

insert ignore into permissions	(permissionId,name,description)
values	(@AdminPortalAccess, "AdminPortalAccess", "General Access to Admin Portal");


/****************
Insert Common Roles
****************/
insert ignore into roles (roleId,name,description)
values	(@CommonUser, "CommonUser", "Common Authenticated User");


# sometimes this is the same a common user you can tweak this based on your business model
insert ignore into roles	(roleId,name,description)
values	(@ControlPanelUser, "ControlPanelUser", "Control Panel User");


# Usually Admin Users are the company employees like customer service or management
insert ignore into roles (roleId,name,description)
values	(@AdminPortalUser, "AdminPortalUser", "Admin Portal User");



/****************
Link Roles to Permissions
****************/

# Common user to common public access
insert ignore into rolePermissions	(roleId,permissionId)
values	(@CommonUser, @PublicApplicationAccess) ;

# Control Panel User to Control Panel Access
insert ignore into rolePermissions	(roleId,permissionId)
values	(@ControlPanelUser, @ControlPanelAccess);

# Admin User to Admin portal access
insert ignore into rolePermissions	(roleId,permissionId)
values	(@AdminPortalUser, @AdminPortalAccess);


/****************************************************************************************************************
Add Your Permissions and Roles Before this comment in order to link all permissions and roles with std@mc.com user
*/
set @userId = (select userId From users where username like 'CommonUser@javu.io' limit 1);
insert ignore into userRoles (roleId , userId)
values (@CommonUser,@userId );


set @userId = (select userId From users where username like 'CPUser@javu.io' limit 1);
insert ignore into userRoles (roleId , userId)
values (@ControlPanelUser,@userId );

set @userId = (select userId From users where username like 'AdminUser@javu.io' limit 1);
insert ignore into userRoles (roleId , userId)
values (@AdminPortalUser,@userId );


