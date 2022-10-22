/** MATCH model */
const db = require("../db");

/** Handle the errors */
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");

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
    static async findAll(phase){
        phase = Number(phase);
        if(phase === 1){
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
                
                ORDER BY m.id`
            );    
            
            // create and assign each team object to the field and delete extras no more needed
            const matches = resMatches.rows.map((m) => {
                m.teamA = {
                    id: m.teamA_id,
                    name: m.teamA_name,
                    shortName: m.teamA_shortName,
                    apiID: m.teamA_apiID
                };
                delete m.teamA_id;
                delete m.teamA_name;
                delete m.teamA_shortName;
                delete m.teamA_apiID;
    
                m.teamB = {
                    id: m.teamB_id,
                    name: m.teamB_name,
                    shortName: m.teamB_shortName,
                    apiID: m.teamB_apiID
                };
                delete m.teamB_id;
                delete m.teamB_name;
                delete m.teamB_shortName;
                delete m.teamB_apiID;

                return m;
            });
            
            return matches;

        }else if(phase === 2){
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
                    m.api_id AS "apiID" 
                FROM
                    matches_phase_2 AS m 
                
                LEFT JOIN stadiums AS s 
                    ON m.stadium_id = s.id 
                
                LEFT JOIN cities AS c 
                    ON m.city_id = c.id 
                
                ORDER BY m.id`
            );

            return resMatches.rows;
        }

        throw new NotFoundError(`Incorrect phase matches`);
    }

    /** 
    * Given a phase and match, return data about match
    *   Returns for matches phase 1: { id, date, time, stadium, city, group, teamA, teamB, result, status, apiID }
    *       where "teamA" or "teamB" is { id, name, shortName, apiID }
    *   Returns for matches phase 2: { id, date, time, stadium, city, phase, teamA_classified, teamA, teamA_result, teamB_classified, teamB, teamB_result, result, status, apiID }
    * 
    *   Throws NotFoundError if phase or match not found
    **/
    static async get(phaseID, matchID) {
        phaseID = Number(phaseID);
        if(phaseID === 1){
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
            let match = resMatch.rows[0];

            if(!match){
                throw new NotFoundError(`Match not found: ${matchID}`);
            }
            
            // create and assign each team object to the field and delete extras no more needed
            match.teamA = {
                id: match.teamA_id,
                name: match.teamA_name,
                shortName: match.teamA_shortName,
                apiID: match.teamA_apiID
            };
            delete match.teamA_id;
            delete match.teamA_name;
            delete match.teamA_shortName;
            delete match.teamA_apiID;

            match.teamB = {
                id: match.teamB_id,
                name: match.teamB_name,
                shortName: match.teamB_shortName,
                apiID: match.teamB_apiID
            };
            delete match.teamB_id;
            delete match.teamB_name;
            delete match.teamB_shortName;
            delete match.teamB_apiID;
            
            return match;

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
                    m.api_id AS "apiID"  
                FROM
                    matches_phase_2 AS m 
                
                LEFT JOIN stadiums AS s 
                    ON m.stadium_id = s.id 
                
                LEFT JOIN cities AS c 
                    ON m.city_id = c.id 
                
                WHERE 
                    m.id = $1`,
            [matchID]);
            let match = resMatch.rows[0];

            if(!match){
                throw new NotFoundError(`Match not found: ${matchID}`);
            }

            return match;
        }

        throw new NotFoundError(`Incorrect match phase`);
    }

    /** 
    * Find the standings for each group/team
    *   Returns [{ group, teamID, teamName, gamesPlayed, gamesWon, gamesDraws, gamesLost, goalsFor, goalsAgainst, goalsDiff, points }, ...]
    **/
     static async getGroupsStandings(){
        const result = await db.query(
            `SELECT 
                gs.group, 
                gs.team_id AS "teamID", 
                t.name AS "teamName",
                gs.games_played, 
                gs.games_won AS "gamesWon", 
                gs.games_draws AS "gamesDraws", 
                gs.games_lost AS "gamesLost", 
                gs.goals_for AS "goalsFor", 
                gs.goals_against AS "goalsAgainst", 
                gs.goals_diff AS "goalsDiff", 
                gs.points 
            FROM
                groups_standings AS gs 
            
            LEFT JOIN teams AS t 
                ON gs.team_id = t.id
                
            ORDER BY 
                gs.group ASC, gs.points DESC, gs.games_won DESC, goals_diff DESC`,
        );
        
        return result.rows;
    }
}

module.exports = Match;
