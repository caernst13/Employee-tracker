const mysql = require('mysql2')

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'wow',
        database: 'company_db'
    },
);

module.exports = connection;