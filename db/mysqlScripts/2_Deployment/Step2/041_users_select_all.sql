DROP PROCEDURE IF EXISTS `users_select_all`;
DELIMITER $$
CREATE PROCEDURE `users_select_all` ()
BEGIN
SELECT users.userId,username,firstName,lastName ,(SELECT GROUP_CONCAT(roles.name)  FROM userRoles 
			inner join roles on userRoles.roleid = roles.roleId
where userRoles.userId = users.userId) 'role',createdOn 'registerDate'
from users ;

END