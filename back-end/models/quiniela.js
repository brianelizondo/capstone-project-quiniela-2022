/** QUINIELA model */
const db = require("../db");

/** Handle the errors */
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");

const Match = require("./match");

/** Related class and functions for QUINIELA object */
class Quiniela {
    /** 
    * Create a new quiniela with data
    *   Returns { id, createdAt, ended_at, userID, status }
    *   Throws BadRequestError on duplicates
    **/
    static async create(userID){
        const result = await db.query(
            `INSERT INTO quinielas 
                (user_id) 
            VALUES 
                ($1) 
            RETURNING 
                id, created_at AS "createdAt", ended_at AS "endedAt", user_id AS "userID", status`, 
        [userID]);
        let quiniela = result.rows[0];

        const matches_phase_1 = await Match.findAll(1);
        let quiniela_matches_phase_1 = [];
        for(const match of matches_phase_1){
            quiniela_matches_phase_1.push(await Quiniela.addMatch(quiniela.id, quiniela.userID, match.id, 1));
        }
        
        const matches_phase_2 = await Match.findAll(2);
        let quiniela_matches_phase_2 = [];
        for(const match of matches_phase_2){
            quiniela_matches_phase_2.push(await Quiniela.addMatch(quiniela.id, quiniela.userID, match.id, 2));
        }

        quiniela.matchesPhase1 = quiniela_matches_phase_1;
        quiniela.matchesPhase2 = quiniela_matches_phase_2;
        
        return quiniela;
    }

    /**
    * Add match to quiniela phase associated
    *   Returns for phase 1 match: { id, matchID, teamAResult, teamBResult }
    *   Returns for phase 2 match: { id, matchID, teamA, teamAResult, teamB, teamBResult }
    */
    static async addMatch(quinielaID, userID, matchID, phase){
        if(phase == 1){
            const result = await db.query(
                `INSERT INTO quinielas_phase_1 
                    (quiniela_id, 
                    user_id, 
                    match_id) 
                VALUES 
                    ($1, $2, $3) 
                RETURNING 
                    id, match_id AS "matchID", team_a_result AS "teamAResult", team_b_result AS "teamBResult"`, 
            [quinielaID, userID, matchID]);
            return result.rows[0];
        }else if(phase == 2){
            const result = await db.query(
                `INSERT INTO quinielas_phase_2 
                    (quiniela_id, 
                    user_id, 
                    match_id) 
                VALUES 
                    ($1, $2, $3) 
                RETURNING 
                    id, match_id AS "matchID", team_a AS "teamA", team_a_result AS "teamAResult", team_b AS "teamB", team_b_result AS "teamBResult"`, 
            [quinielaID, userID, matchID]);
            return result.rows[0];
        }
        
        quiniela_matches_phase_2.push(result.rows[0]);
    }

    /** 
    * Find all active quinielas from an user
    *   Returns [ {id, createdAt, endedAt, userID, status, matchesPhase1, matchesPhase2 }, ...]
    **/
     static async findAllActive(userID){
        const result = await db.query(
            `SELECT 
                id, created_at, ended_at 
            FROM 
                quinielas 
            WHERE
                user_id = $1 AND status = 0 
            ORDER BY 
                id`,
        [userID]);
        
        let quinielas = [];
        for(let quiniela of result.rows){
            const resultP1 = await db.query(
                `SELECT 
                    id, 
                    match_id AS "matchID", 
                    team_a_result AS "teamAResult", 
                    team_b_result AS "teamBResult" 
                FROM 
                    quinielas_phase_1 
                WHERE
                    quiniela_id = $1`,
            [quiniela.id]);
            quiniela.matchesPhase1 = resultP1.rows;

            const resultP2 = await db.query(
                `SELECT 
                    id, 
                    match_id AS "matchID", 
                    team_a AS "teamA", 
                    team_a_result AS "teamAResult", 
                    team_b AS "teamB", 
                    team_b_result AS "teamBResult" 
                FROM 
                    quinielas_phase_2 
                WHERE
                    quiniela_id = $1`,
            [quiniela.id]);
            quiniela.matchesPhase2 = resultP2.rows;
            
            quinielas.push(quiniela);
        }

        return quinielas;
    }
}
module.exports = Quiniela;