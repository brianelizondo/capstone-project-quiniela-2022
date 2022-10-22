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
    * Find all teams
    *   Returns [{ id, name, shortName, apiID }, ...]
    **/
     static async findAll(){
        const result = await db.query(
            `SELECT 
                id,     
                name,
                short_name AS "shortName",
                api_id AS "apiID" 
            FROM 
                teams 
            ORDER BY 
                name ASC`
        );

        return result.rows;
    }
    
    /** 
    * Given a team, return data about team
    *   Returns { id, name, shortName, api_id }
    *   Throws NotFoundError if team not found
    **/
     static async get(shortName) {
        const result = await db.query(
            `SELECT 
                id,     
                name,
                short_name AS "shortName",
                api_id AS "apiID" 
            FROM 
                teams 
            WHERE 
                short_name = $1`,
        [shortName.toUpperCase()]);
        const team = result.rows[0];

        if(!team){
            throw new NotFoundError(`Team not found: ${shortName}`);
        } 
        
        return team;
    }

}

module.exports = Team;
