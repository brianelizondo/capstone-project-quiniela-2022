/** GROUP model */
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

/** Related class and functions for GROUP object */
class Group {
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
                t.short_name AS "shortName",
                gs.games_played AS "gamesPlayed", 
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

    /** 
    * Find all matches in a group
    *   Returns [{ id, date, time, stadium, city, group, teamA, teamB, result, status, apiID }, ...]
    *   where "teamA" or "teamB" is { id, name, shortName, apiID }
    **/
     static async getGroupMatches(group){
        if(!["A", "B", "C", "D", "E", "F", "G", "H"].includes(group.toUpperCase())){
            throw new BadRequestError(`Incorrect group`);
        }else{
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
                
                WHERE 
                    m.match_group = $1 
                
                GROUP BY 
                    m.match_date, m.id, s.name, c.city, ta.id, tb.id    
                ORDER BY 
                    m.match_date ASC, m.match_time ASC`,
            [group.toUpperCase()]);    
            
            // create and assign each team object
            const matches = teamObjectAssign(resMatches.rows);

            // get and set the info from API of teams and match
            const matchesAPIInfo = await ApiFootball.getMatches();

            return setMatchTeamsInfo(matches, matchesAPIInfo);
        }
    }
}

module.exports = Group;
