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
    *   Returns { id, createdAt, ended_at, userID, status, matchesPhase1, matchesPhase2 }
    *       where matchesPhase1 is: { id, matchID, teamAResult, teamBResult, points }
    *       where matchesPhase2 is: { id, matchID, teamA, teamAResult, teamB, teamBResult, points }
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

        const resultPoints = await db.query(
            `INSERT INTO quinielas_points 
                (quiniela_id, user_id) 
            VALUES 
                ($1, $2)
            RETURNING 
                points`, 
        [quiniela.id, userID]);
        quiniela.points = resultPoints.rows[0].points;
        
        return quiniela;
    }

    /**
    * Add match to quiniela phase associated
    *   Returns for phase 1 match: { id, matchID, teamAResult, teamBResult, points }
    *   Returns for phase 2 match: { id, matchID, teamA, teamAResult, teamB, teamBResult, points }
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
    * Return the list of matches for the quinielas
    *   Returns for phase 1 match: { id, matchID, teamAResult, teamBResult, points }
    *   Returns for phase 2 match: { id, matchID, teamA, teamAResult, teamB, teamBResult, points }
    */
     static async matchesList(quinielaID, phase){
        let quinielaMatches;
        if(phase == 1){
            const result = await db.query(
                `SELECT 
                    id, 
                    match_id AS "matchID", 
                    team_a_result AS "teamAResult", 
                    team_b_result AS "teamBResult",
                    points 
                FROM 
                    quinielas_phase_1 
                WHERE
                    quiniela_id = $1`,
            [quinielaID]);
            quinielaMatches = result.rows;
        }else if(phase == 2){
            const result = await db.query(
                `SELECT 
                    id, 
                    match_id AS "matchID", 
                    team_a AS "teamA", 
                    team_a_result AS "teamAResult", 
                    team_b AS "teamB", 
                    team_b_result AS "teamBResult",
                    points  
                FROM 
                    quinielas_phase_2 
                WHERE
                    quiniela_id = $1`,
            [quinielaID]);
            quinielaMatches = result.rows;
        }

        return quinielaMatches;
    }

    /** 
    * Find all active quinielas
    *   Returns [ { quinielaID, userID, userFirstName, userLastName, championTeamID, championTeamName, points }, ...]
    **/
     static async findAllActive(){
        const result = await db.query(
            `SELECT 
                qp.quiniela_id AS "quinielaID", 
                qp.user_id AS "userID", 
                u.first_name AS "userFirstName",
                u.last_name AS "userLastName",
                qp.champion_team_id AS "championTeamID", 
                t.name AS "championTeamName",
                qp.points 
            FROM 
                quinielas_points AS qp 
            
            LEFT JOIN users AS u 
                ON qp.user_id = u.id 
            
            LEFT JOIN teams AS t 
                ON qp.champion_team_id = t.id 
            
            ORDER BY 
                qp.points DESC`
        );

        return result.rows;
    }

    /** 
    * Find all active quinielas from an user
    *   Returns [ {id, createdAt, endedAt, userID, status, matchesPhase1, matchesPhase2 }, ...]
    **/
     static async findAllActiveByUser(userID){
        const result = await db.query(
            `SELECT 
                id, 
                created_at AS "createdAt", 
                ended_at AS "endedAT"  
            FROM 
                quinielas 
            WHERE
                user_id = $1 AND status = 0 
            ORDER BY 
                id`,
        [userID]);
        
        let quinielas = [];
        for(let quiniela of result.rows){
            quiniela.matchesPhase1 = await Quiniela.matchesList(quiniela.id, 1);
            quiniela.matchesPhase2 = await Quiniela.matchesList(quiniela.id, 2);
            quinielas.push(quiniela);
        }

        return quinielas;
    }

    /** 
    * Find active quiniela details of user
    *   Returns [ {id, createdAt, endedAt, userID, status, matchesPhase1, matchesPhase2 }, ...]
    **/
     static async findDetails(userID, quinielaID){
        const result = await db.query(
            `SELECT 
                q.id, 
                q.user_id AS "userID", 
                q.created_at AS "createdAt", 
                q.ended_at AS "endedAt", 
                qp.points, 
                qp.champion_team_id AS "championTeamID", 
                t.name AS "championTeamName" 
            FROM 
                quinielas AS q 

            LEFT JOIN quinielas_points AS qp 
                ON q.id = qp.quiniela_id 
            
            LEFT JOIN teams AS t 
                ON qp.champion_team_id = t.id 

            WHERE 
                q.id = $1 AND q.user_id = $2 AND q.status = 0`,
        [quinielaID, userID]);
        let quiniela = result.rows[0];

        if(!quiniela){
            throw new NotFoundError(`Quiniela/User not found`);
        }
        
        quiniela.matchesPhase1 = await Quiniela.matchesList(quinielaID, 1);
        quiniela.matchesPhase2 = await Quiniela.matchesList(quinielaID, 2);
        
        return quiniela;
    }
}
module.exports = Quiniela;