const pgp = require('pg-promise')();
const db = pgp({
    user: 'root',
    password: 'root',
    host: 'localhost',
    port : 3306,
    database: 'pessoa'
});

exports.db = db;