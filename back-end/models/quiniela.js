/** QUINIELA model */
const db = require("../db");

/** Handle the errors */
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");


/** Related class and functions for QUINIELA object */
class Quiniela {
    /** 
    * Create a new quiniela with data
    *   Returns { id, createdAt, ended_at, userID, status }
    *   Throws BadRequestError on duplicates
    **/
     static async create(userID){
        console.log(userID);
        const result = await db.query(
            `INSERT INTO quinielas 
                (user_id) 
            VALUES 
                ($1) 
            RETURNING 
                id, created_at AS "createdAt", ended_at AS "endedAt", user_id AS "userID", status`, 
        [userID]);
        
        return result.rows[0];
    }
}
module.exports = Quiniela;