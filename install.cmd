echo off
cls
echo *********************************************************
echo make sure you are running this entire shell in admin mode
echo *********************************************************
pause
echo on
cd modules
cd mHash
call install.cmd
call link.cmd
cd..
cd mLogger
call install.cmd
call link.cmd
cd..
cd mError
call linkLogger.cmd
call install.cmd
call link.cmd
cd..
cd mEmail
call install.cmd
call link.cmd
cd..
cd mDAL
call linkLogger.cmd
call install.cmd
call link.cmd
cd..
cd..
cd server
call linkHash.cmd
call linkLogger.cmd
call linkErrors.cmd
call linkDALs.cmd
call linkEmail.cmd
npm install
cd..
pause