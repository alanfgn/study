const mysql = require('mysql')
const util = require( 'util' );

const myConection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "notes"
})

module.exports = myConection