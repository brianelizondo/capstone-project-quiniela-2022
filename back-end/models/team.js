/** TEAM model */
const db = require("../db");

/** Handle the errors */
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");

/** API class to handle info request */
const ApiFootball = require("../helpers/api-football");

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
                
        // get info from the API about each team
        const teamsAPIInfo = await ApiFootball.getTeams();
        let teams = [];
        result.rows.forEach(team => {
            for(let teamAPI of teamsAPIInfo){
                if(team.apiID == teamAPI.team.id){
                    delete teamAPI.team.id;
                    delete teamAPI.team.country;
                    delete teamAPI.team.national;
                    team.apiInfo = teamAPI.team;
                    teams.push(team);
                }
            }
        });

        return teams;
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
        let team = result.rows[0];

        if(!team){
            throw new NotFoundError(`Team not found: ${shortName}`);
        } 

        // get info from the API about the team
        team.apiInfo = await ApiFootball.getTeam(team.apiID);
        delete team.apiInfo.id;
        delete team.apiInfo.country;
        delete team.apiInfo.national;
        
        return team;
    }

}

module.exports = Team;
