const sql = require('mysql');
const fs = require('fs');
 
var config = {
    user: 'root',
    password: 'root',
    host: 'localhost',
    port : 3306,
    database: 'pessoa'
};
 
const db = new sql.createConnection(config)

module.exports = db;