const mysql = require('mysql2');

const db = mysql.createConnection({
    host : 'localhost',
    user : "muhazAhmed",
    password : process.env.DB_PASSWORD,
    database : "cointab"
})
db.connect((err) => {
    if(err) throw err;
    console.log("DataBase connected...")
})

module.exports = db