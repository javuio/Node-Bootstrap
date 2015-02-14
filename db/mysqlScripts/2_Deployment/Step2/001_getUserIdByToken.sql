DROP FUNCTION IF EXISTS `getUserIdByToken`;

DELIMITER $$

CREATE DEFINER=`root`@`localhost` FUNCTION `getUserIdByToken`(_userToken varchar(36)) RETURNS int(11)
BEGIN
	SET @userId = (select userId from users where userToken = _userToken);
	RETURN @userId;	
END