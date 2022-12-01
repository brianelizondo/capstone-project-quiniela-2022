/** GOD model */
const db = require("../db");

/** Handle the errors */
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");

const Quiniela = require('./quiniela');

/** Related class and functions for GOD object */
class God {
    /** 
    * Update matches goals/teams
    **/
     static async updateGoalsTeams(matchID, matchData){
        matchID = Number(matchID);
        if(matchID >= 1 && matchID <= 48){
            // update info for math in phase 1
            // get match details
            const checkMatch = await db.query(
                `SELECT 
                    id, team_a_id AS "teamA_id", team_b_id AS "teamB_id"   
                FROM
                    matches_phase_1                 
                WHERE
                    id = $1`,
            [matchID]);  
            const match = checkMatch.rows[0]
            
            if(!match){
                throw new NotFoundError(`Match not found: ${matchID}`);
            }
            
            // update goals in the match
            await db.query(
                `UPDATE  
                    matches_phase_1 
                SET 
                    team_a_result=$1, team_b_result=$2, match_status=1
                WHERE
                    id = $3`,
            [matchData.teamA_result, matchData.teamB_result, matchID]);
            
            // update the team A standings
            const respStatsA = await db.query(
                `SELECT 
                    games_played AS "gamesPlayed",
                    games_won AS "gamesWon",
                    games_draws AS "gamesDraws",
                    games_lost AS "gamesLost",
                    goals_for AS "goalsFor",
                    goals_against AS "goalsAgainst",
                    goals_diff AS "goalsDiff",
                    points   
                FROM
                    groups_standings                 
                WHERE
                    team_id = $1`,
            [match.teamA_id]);
            let teamA_Stats = respStatsA.rows[0];

            // update the team B standings
            const respStatsB = await db.query(
                `SELECT 
                    games_played AS "gamesPlayed",
                    games_won AS "gamesWon",
                    games_draws AS "gamesDraws",
                    games_lost AS "gamesLost",
                    goals_for AS "goalsFor",
                    goals_against AS "goalsAgainst",
                    goals_diff AS "goalsDiff",
                    points   
                FROM
                    groups_standings                 
                WHERE
                    team_id = $1`,
            [match.teamB_id]);
            let teamB_Stats = respStatsB.rows[0];
            
            // check match result and update teams stats
            // games played
            teamA_Stats.gamesPlayed++;
            teamB_Stats.gamesPlayed++;
            // check if the match is won/lost or draw to assign points and stats
            if(matchData.teamA_result > matchData.teamB_result){
                teamA_Stats.gamesWon++;
                teamB_Stats.gamesLost++;
                teamA_Stats.points = teamA_Stats.points + 3;
            }else if(matchData.teamA_result < matchData.teamB_result){
                teamA_Stats.gamesLost++;
                teamB_Stats.gamesWon++;
                teamB_Stats.points = teamB_Stats.points + 3;
            }else if(matchData.teamA_result === matchData.teamB_result){
                teamA_Stats.gamesDraws++;
                teamB_Stats.gamesDraws++;
                teamA_Stats.points++;
                teamB_Stats.points++;
            }
            // set additional stats for the teams
            teamA_Stats.goalsFor = teamA_Stats.goalsFor + matchData.teamA_result;
            teamB_Stats.goalsFor = teamB_Stats.goalsFor + matchData.teamB_result;
            teamA_Stats.goalsAgainst = teamA_Stats.goalsAgainst + matchData.teamB_result;
            teamB_Stats.goalsAgainst = teamB_Stats.goalsAgainst + matchData.teamA_result;
            teamA_Stats.goalsDiff = teamA_Stats.goalsFor - teamA_Stats.goalsAgainst;
            teamB_Stats.goalsDiff = teamB_Stats.goalsFor - teamB_Stats.goalsAgainst;
            
            // update teams A stats
            await db.query(
                `UPDATE  
                    groups_standings 
                SET 
                    games_played=$1, games_won=$2, games_draws=$3, games_lost=$4, goals_for=$5, goals_against=$6, goals_diff=$7, points=$8 
                WHERE
                    team_id = $9`,
            [teamA_Stats.gamesPlayed, teamA_Stats.gamesWon, teamA_Stats.gamesDraws, teamA_Stats.gamesLost, teamA_Stats.goalsFor, teamA_Stats.goalsAgainst, teamA_Stats.goalsDiff, teamA_Stats.points, match.teamA_id]);
            
            // update teams B stats
            await db.query(
                `UPDATE  
                    groups_standings 
                SET 
                    games_played=$1, games_won=$2, games_draws=$3, games_lost=$4, goals_for=$5, goals_against=$6, goals_diff=$7, points=$8 
                WHERE
                    team_id = $9`,
            [teamB_Stats.gamesPlayed, teamB_Stats.gamesWon, teamB_Stats.gamesDraws, teamB_Stats.gamesLost, teamB_Stats.goalsFor, teamB_Stats.goalsAgainst, teamB_Stats.goalsDiff, teamB_Stats.points, match.teamB_id]);
            
            // update points for each quiniela match
            await Quiniela.updateMatchPoints(matchID, match.teamA_id, matchData.teamA_result, match.teamB_id, matchData.teamB_result);

        
        }else if(matchID >= 49 && matchID <= 64){
            // update info for math in phase 2
            // set result to number
            matchData.teamA_result = matchData.teamA_result !== "" ? matchData.teamA_result : null;
            matchData.teamB_result = matchData.teamB_result !== "" ? matchData.teamB_result : null;
            matchData.match_apiID = matchData.match_apiID !== "" ? matchData.match_apiID : null;
            
            // get match details
            const match = await db.query(
                `SELECT 
                    id, team_a_id, team_b_id      
                FROM
                    matches_phase_2                 
                WHERE
                    id = $1`,
            [matchID]);   
            if(!match.rows[0]){
                throw new NotFoundError(`Match not found: ${matchID}`);
            }

            // update goals and teams in the match
            await db.query(
                `UPDATE  
                    matches_phase_2 
                SET 
                    team_a_id=$1, team_a_result=$2, team_b_id=$3, team_b_result=$4, api_id=$5, match_status=1
                WHERE
                    id = $6`,
            [matchData.teamA_id, matchData.teamA_result, matchData.teamB_id, matchData.teamB_result, matchData.apiID, matchID]);

            // update points for each quiniela match
            // only if receive the match results
            if(matchData.teamA_result !== null && matchData.teamB_result !== null){
                await Quiniela.updateMatchPoints(matchID, matchData.teamA_id, matchData.teamA_result, matchData.teamB_id, matchData.teamB_result);
            }
            
        }else{
            throw new BadRequestError(`Match ID invalid`);
        }
    }
}

module.exports = God;
