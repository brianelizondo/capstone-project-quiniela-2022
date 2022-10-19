/** TEAM model */
const db = require("../db");

/** Handle the errors */
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");


/** Related class and functions for TEAM object */
class Team {
    /** 
    * Given a team, return data about team
    *   Returns { id, name, shortName, api_id }
    *   Throws NotFoundError if team not found
    **/
     static async get(id) {
        const teamRes = await db.query(
            `SELECT 
                id, 
                name, 
                short_name AS "shortName", 
                api_id AS "apiID" 
            FROM 
                teams 
            WHERE 
                id = $1`,
        [id]);
        const team = teamRes.rows[0];

        if(!team){
            throw new NotFoundError(`ID Team not found: ${id}`);
        } 
        
        return team;
    }

}

module.exports = Team;
