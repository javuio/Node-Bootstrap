CREATE TABLE IF NOT EXISTS `rolePermissions` (
  `roleId` INT(11) NOT NULL,
 `permissionId` int(11) NOT NULL,
  PRIMARY KEY (`roleId`,`permissionId`),
  CONSTRAINT `fk_rolePermissions_permissionId_permissions` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`permissionId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_rolePermissions_roleId_roles` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`) ON DELETE NO ACTION ON UPDATE NO ACTION
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;