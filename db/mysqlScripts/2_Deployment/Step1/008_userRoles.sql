CREATE TABLE IF NOT EXISTS `userRoles` (
 `roleId` INT(11) NOT NULL,
 `userId` int(11) NOT NULL,
  PRIMARY KEY (`roleId`,`userId`),
  CONSTRAINT `fk_userRoles_userId_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_userRoles_roleId_roles` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`) ON DELETE CASCADE ON UPDATE CASCADE
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;