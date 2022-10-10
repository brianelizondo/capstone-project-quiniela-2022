/** 
* Database setup for Quinielas 2022 App
*/
const { Client } = require("pg");
const { DB_USER, DB_PASS, getDatabaseUri } = require("./config");

let db;

if(process.env.NODE_ENV === "production") {
    db = new Client({
        connectionString: getDatabaseUri(),
        ssl: {
            rejectUnauthorized: false
        }
    });
}else{
    db = new Client({
        user: DB_USER,
        password: DB_PASS,
        database: getDatabaseUri()
    });
}

db.connect();

module.exports = db;