DROP PROCEDURE IF EXISTS tempAuthKeys_validateKey;

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tempAuthKeys_validateKey`(
	_key varchar(36))
begin
		select * from tempAuthKeys where `key`=_key and expiresOn > UTC_TIMESTAMP();
end