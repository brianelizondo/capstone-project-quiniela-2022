/** MATCH model */
const db = require("../db");
const { teamObjectAssign, setMatchTeamsInfo } = require("../helpers/helpers");

/** Handle the errors */
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");

/** API class to handle info request */
const ApiFootball = require("../helpers/api-football");

/** Related class and functions for MATCH object */
class Match {
    /** 
    * Find all matches in the phase
    *   Matches Phase 1:
    *       Returns [{ id, date, time, stadium, city, group, teamA, teamB, result, status, apiID }, ...]
    *           where "teamA" or "teamB" is { id, name, shortName, apiID }
    * 
    *   Matches Phase 2:
    *       Returns [{ id, date, time, stadium, city, phase, teamA_classified, teamA, teamA_result, teamB_classified, teamB, teamB_result, result, status, apiID }, ...]
    **/
    static async findAll(phaseID){
        phaseID = Number(phaseID);
        let matches;
        if(phaseID < 1 || phaseID > 2 || isNaN(phaseID)){
            throw new NotFoundError(`Incorrect phase matches`);
        }else if(phaseID === 1){
            const resMatches = await db.query(
                `SELECT 
                    m.id, 
                    m.match_date AS "date", 
                    m.match_time AS "time",  
                    s.name AS "stadium", 
                    c.city, 
                    m.match_group AS "group", 
                    m.team_a_id AS "teamA",
                    m.team_b_id AS "teamB", 
                    m.match_result AS "result", 
                    m.match_status AS "status", 
                    m.api_id AS "apiID", 
                    ta.id AS "teamA_id", 
                    ta.name AS "teamA_name", 
                    ta.short_name AS "teamA_shortName", 
                    ta.api_id AS "teamA_apiID",
                    tb.id AS "teamB_id", 
                    tb.name AS "teamB_name", 
                    tb.short_name AS "teamB_shortName", 
                    tb.api_id AS "teamB_apiID"  
                FROM
                    matches_phase_1 AS m 
                
                LEFT JOIN stadiums AS s 
                    ON m.stadium_id = s.id 
                
                LEFT JOIN cities AS c 
                    ON m.city_id = c.id 
                
                LEFT JOIN teams AS ta 
                    ON m.team_a_id = ta.id 

                LEFT JOIN teams AS tb 
                    ON m.team_b_id = tb.id 
                
                GROUP BY 
                    m.match_date, m.id, s.name, c.city, ta.id, tb.id    
                ORDER BY 
                    m.match_date ASC, m.match_time ASC`
            );    
            
            // create and assign each team object
            matches = teamObjectAssign(resMatches.rows);

        }else if(phaseID === 2){
            const resMatches = await db.query(
                `SELECT 
                    m.id, 
                    m.match_date AS "date", 
                    m.match_time AS "time",  
                    s.name AS "stadium", 
                    c.city, 
                    m.match_phase AS "phase", 
                    m.team_a_classified AS "teamA_classified",
                    m.team_a_id AS "teamA",
                    m.team_a_result AS "teamA_result",
                    m.team_b_classified AS "teamB_classified",
                    m.team_b_id AS "teamB",
                    m.team_b_result AS "teamB_result", 
                    m.match_result AS "result", 
                    m.match_status AS "status",
                    m.api_id AS "apiID", 
                    ta.id AS "teamA_id", 
                    ta.name AS "teamA_name", 
                    ta.short_name AS "teamA_shortName", 
                    ta.api_id AS "teamA_apiID",
                    tb.id AS "teamB_id", 
                    tb.name AS "teamB_name", 
                    tb.short_name AS "teamB_shortName", 
                    tb.api_id AS "teamB_apiID" 
                FROM
                    matches_phase_2 AS m 
                
                LEFT JOIN stadiums AS s 
                    ON m.stadium_id = s.id 
                
                LEFT JOIN cities AS c 
                    ON m.city_id = c.id 
                
                LEFT JOIN teams AS ta 
                    ON m.team_a_id = ta.id 

                LEFT JOIN teams AS tb 
                    ON m.team_b_id = tb.id 
                
                GROUP BY 
                    m.match_date, m.id, s.name, c.city, ta.id, tb.id    
                ORDER BY 
                    m.match_date ASC, m.match_time ASC`
            );

            // create and assign each team object
            matches = teamObjectAssign(resMatches.rows);
        }

        // get and set the info from API of teams and match
        const matchesAPIInfo = await ApiFootball.getMatches();

        return setMatchTeamsInfo(matches, matchesAPIInfo);
    }

    /** 
    * Given a phase and match, return data about match
    *   Returns for matches phase 1: { id, date, time, stadium, city, group, teamA, teamB, result, status, apiID }
    *       where "teamA" or "teamB" is { id, name, shortName, apiID }
    *   Returns for matches phase 2: { id, date, time, stadium, city, phase, teamA_classified, teamA, teamA_result, teamB_classified, teamB, teamB_result, result, status, apiID }
    * 
    *   Throws NotFoundError if phase or match not found
    **/
    static async getMatch(phaseID, matchID) {
        phaseID = Number(phaseID);
        let match;
        if(phaseID < 1 || phaseID > 2 || isNaN(phaseID)){
            throw new NotFoundError(`Incorrect match phase`);
        }else if(phaseID === 1){
            const resMatch = await db.query(
                `SELECT 
                    m.id, 
                    m.match_date AS "date", 
                    m.match_time AS "time",  
                    s.name AS "stadium", 
                    c.city, 
                    m.match_group AS "group", 
                    m.team_a_id AS "teamA",
                    m.team_b_id AS "teamB", 
                    m.match_result AS "result", 
                    m.match_status AS "status", 
                    m.api_id AS "apiID", 
                    ta.id AS "teamA_id", 
                    ta.name AS "teamA_name", 
                    ta.short_name AS "teamA_shortName", 
                    ta.api_id AS "teamA_apiID",
                    tb.id AS "teamB_id", 
                    tb.name AS "teamB_name", 
                    tb.short_name AS "teamB_shortName", 
                    tb.api_id AS "teamB_apiID"  
                FROM
                    matches_phase_1 AS m 
                
                LEFT JOIN stadiums AS s 
                    ON m.stadium_id = s.id 
                
                LEFT JOIN cities AS c 
                    ON m.city_id = c.id 
                
                LEFT JOIN teams AS ta 
                    ON m.team_a_id = ta.id 

                LEFT JOIN teams AS tb 
                    ON m.team_b_id = tb.id 
                
                WHERE
                    m.id = $1`,
            [matchID]);   
            
            if(!resMatch.rows[0]){
                throw new NotFoundError(`Match not found: ${matchID}`);
            }
            
            // create and assign each team object
            match = teamObjectAssign(resMatch.rows);

        }else if(phaseID === 2){
            const resMatch = await db.query(
                `SELECT 
                    m.id, 
                    m.match_date AS "date", 
                    m.match_time AS "time",  
                    s.name AS "stadium", 
                    c.city, 
                    m.match_phase AS "phase", 
                    m.team_a_classified AS "teamA_classified",
                    m.team_a_id AS "teamA",
                    m.team_a_result AS "teamA_result",
                    m.team_b_classified AS "teamB_classified",
                    m.team_b_id AS "teamB",
                    m.team_b_result AS "teamB_result", 
                    m.match_result AS "result", 
                    m.match_status AS "status",
                    m.api_id AS "apiID", 
                    ta.id AS "teamA_id", 
                    ta.name AS "teamA_name", 
                    ta.short_name AS "teamA_shortName", 
                    ta.api_id AS "teamA_apiID",
                    tb.id AS "teamB_id", 
                    tb.name AS "teamB_name", 
                    tb.short_name AS "teamB_shortName", 
                    tb.api_id AS "teamB_apiID"  
                FROM
                    matches_phase_2 AS m 
                
                LEFT JOIN stadiums AS s 
                    ON m.stadium_id = s.id 
                
                LEFT JOIN cities AS c 
                    ON m.city_id = c.id 

                LEFT JOIN teams AS ta 
                    ON m.team_a_id = ta.id 

                LEFT JOIN teams AS tb 
                    ON m.team_b_id = tb.id
                
                WHERE 
                    m.id = $1`,
            [matchID]);
            
            if(!resMatch.rows[0]){
                throw new NotFoundError(`Match not found: ${matchID}`);
            }

            // create and assign each team object
            match = teamObjectAssign(resMatch.rows);
        }

        // get and set the info from API of teams and match
        const matchAPIInfo = await ApiFootball.getMatch(match[0].apiID);
        match = setMatchTeamsInfo(match, matchAPIInfo);

        // get stats of the match
        match[0].apiStats = await ApiFootball.getMatchStats(match[0].apiID);

        return match[0];
    }
}

module.exports = Match;
