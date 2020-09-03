const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'TalkAppDatabase',
    port: 3306
});

connection.connect(err => {
    if(err)
        console.log('Error when connecting to database: ' + err);
    else
        console.log("Connected to the database!");
});

module.exports = connection;