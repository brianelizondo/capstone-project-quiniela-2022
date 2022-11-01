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
    *   Returns { id, name, shortName, apiID, apiInfo }
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

    /** 
    * Given a team, return stats data about team from the API
    *   Returns { matchesPlayed, matchesWon, matchesDrawn, matchesLost, goalsFor, goalsForAvg, goalsAgainst, goalsAgainstAvg, cardsYellow, cardsRed, cardsYellowAvg, cardsRedAvg, cleanSheet  }
    *   Throws NotFoundError if team not found
    **/
    static async getTeamStats(shortName) {
        const result = await db.query(
            `SELECT 
                id, 
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

        // get stats data from the API about the team
        let teamStats = await ApiFootball.getTeamStats(team.apiID);
        
        // clean up response from the API and set stats
        let refactorStats = {};
        // stats for matches
        refactorStats.matches = {
            played: teamStats.fixtures.played.total,
            won: teamStats.fixtures.wins.total,
            drawn: teamStats.fixtures.draws.total,
            lost: teamStats.fixtures.loses.total
        }
        
        //stats for goals
        refactorStats.goals = {
            for: teamStats.goals.for.total.total,
            forAvg: (teamStats.goals.for.total.total / refactorStats.matches.played).toFixed(2),
            against: teamStats.goals.against.total.total,
            againstAvg: (teamStats.goals.against.total.total / refactorStats.matches.played).toFixed(2)
        }
        
        //stats for cards
        refactorStats.cards = {
            yellow: 0,
            red: 0
        }
        for(let cardTime of Object.keys(teamStats.cards.yellow)){
            refactorStats.cards.yellow += teamStats.cards.yellow[cardTime].total >= 0 ? teamStats.cards.yellow[cardTime].total : 0;
            refactorStats.cards.red += teamStats.cards.red[cardTime].total >= 0 ? teamStats.cards.red[cardTime].total : 0;
        }
        refactorStats.cards.yellowAvg = (refactorStats.cards.yellow / refactorStats.matches.played).toFixed(2);
        refactorStats.cards.redAvg = (refactorStats.cards.red / refactorStats.matches.played).toFixed(2);
        // stats for clean sheet
        refactorStats.cleanSheet = {
            total: teamStats.clean_sheet.total,
            avg: (teamStats.clean_sheet.total / refactorStats.matches.played).toFixed(2)
        }
        
        return [refactorStats];
    }

    /** 
    * Given a team, return squad of the team
    *   Returns [{ id, name, number, position, photo }, ...]
    *   Throws NotFoundError if team not found
    **/
    static async getTeamSquad(shortName) {
        const result = await db.query(
            `SELECT 
                id, 
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

        // get stats data from the API about the team
        let teamSquad = await ApiFootball.getTeamSquad(team.apiID);

        return teamSquad[0].players;
    }
}

module.exports = Team;
