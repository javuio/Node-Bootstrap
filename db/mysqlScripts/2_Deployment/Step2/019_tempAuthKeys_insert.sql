DROP PROCEDURE IF EXISTS tempAuthKeys_insert;

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tempAuthKeys_insert`(
	_userId int(11))
begin
	declare _key varchar(36);
	declare _email varchar(60);
   declare _expiresOn datetime;
   set _expiresOn = DATE_ADD(UTC_TIMESTAMP(), INTERVAL 3 HOUR) ;
	set _key = UUID();
	set _email = (select username from users where userId = _userId);
	
		insert into tempAuthKeys
			(userId, `key`, expiresOn, email) 
		values
			(_userId, _key, _expiresOn, _email);
		select _email email,_key `key`;
end