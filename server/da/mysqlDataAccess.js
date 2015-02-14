var config = require('../config.js');
var mysqlConnection = require("mDAL/mysql/mysqlDAL.js");
var conn = new mysqlConnection();

console.log('Connect to mysql DB');
conn.init(config.mysqlConfig);
module.exports =conn;

