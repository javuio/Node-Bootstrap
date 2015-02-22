DROP PROCEDURE IF EXISTS tempAuthKeys_delete;

DELIMITER $$

CREATE  PROCEDURE `tempAuthKeys_delete`(
	_key varchar(36))
begin
	
	delete from tempAuthKeys where `key` = _key;

	select 1;
end;