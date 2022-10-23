/** 
* Shared config for application; can be required many places
*/
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const PORT = +process.env.PORT;
const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;
const API_FOOTBALL_TIMEZONE = process.env.API_FOOTBALL_TIMEZONE;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri(){
    return (process.env.NODE_ENV === "test")
        ? "quinielas_test"
        : process.env.DATABASE_URL || "quinielas";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
    SECRET_KEY,
    DB_USER,
    DB_PASS,
    PORT,
    BCRYPT_WORK_FACTOR,
    API_FOOTBALL_KEY,
    API_FOOTBALL_TIMEZONE,
    getDatabaseUri
};