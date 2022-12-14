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
    *   Returns { id, createdAt, ended_at, userID, status, matchesPhase1, matchesPhase2, points }
    *       where matchesPhase1 is: [{ id, matchID, teamAResult, teamBResult, points }, ...]
    *       where matchesPhase2 is: [{ id, matchID, matchPhase, teamA, teamAResult, teamB, teamBResult, points }, ...]
    **/
    static async create(userID, matchesData, formData){
        // create a new quiniela
        const result = await db.query(
            `INSERT INTO quinielas 
                (user_id, status) 
            VALUES 
                ($1, 1) 
            RETURNING 
                id, created_at AS "createdAt", ended_at AS "endedAt", user_id AS "userID", status`, 
        [userID]);
        let quiniela = result.rows[0];

        // find all matches in the phase 1 and add to the quiniela phase 1 with goals data
        const matches_phase_1 = await Match.findAll(1);
        let quiniela_matches_phase_1 = [];
        for(const match of matches_phase_1){
            const teamA_result = Number(formData[`match_${match.id}_team_a`]);
            const teamB_result = Number(formData[`match_${match.id}_team_b`]);
            
            quiniela_matches_phase_1.push(await Quiniela.addMatch(quiniela.id, quiniela.userID, match.id, 1, match.teamA.id, teamA_result, match.teamB.id, teamB_result));
        }
        // find all matches in the phase 2 and add to the quiniela phase 2 with teams/goals data
        const matches_phase_2 = await Match.findAll(2);
        let quinielaTeamChampionID = 0;
        let quiniela_matches_phase_2 = [];
        for(const match of matches_phase_2){
            const teamA_result = Number(formData[`match_${match.id}_team_a`]);
            const teamB_result = Number(formData[`match_${match.id}_team_b`]);
            const teamsMatch = matchesData[match.phase].filter(matchPhase => matchPhase.id === match.id);
            
            quiniela_matches_phase_2.push(await Quiniela.addMatch(quiniela.id, quiniela.userID, match.id, 2, teamsMatch[0].teamA.teamID, teamA_result, teamsMatch[0].teamB.teamID, teamB_result, match.phase));

            // check and set the champion team
            if(match.phase === 'F'){
                if(teamA_result > teamB_result){
                    quinielaTeamChampionID = teamsMatch[0].teamA.teamID;
                }else if(teamB_result > teamA_result){
                    quinielaTeamChampionID = teamsMatch[0].teamB.teamID;
                }
            }
        }
        quiniela.matchesPhase1 = quiniela_matches_phase_1;
        quiniela.matchesPhase2 = quiniela_matches_phase_2;

        // set a new quiniela total points
        const resultPoints = await db.query(
            `INSERT INTO quinielas_points 
                (quiniela_id, user_id, champion_team_id, status) 
            VALUES 
                ($1, $2, $3, 1)
            RETURNING 
                points`, 
        [quiniela.id, userID, quinielaTeamChampionID]);
        quiniela.points = resultPoints.rows[0].points;
        
        return quiniela;
    }

    /**
    * Add match to quiniela phase associated
    *   Returns for phase 1 match: { id, matchID, teamAResult, teamBResult, points }
    *   Returns for phase 2 match: { id, matchID, teamA, teamAResult, teamB, teamBResult, points }
    */
    static async addMatch(quinielaID, userID, matchID, phase, teamA_id, teamA_result, teamB_id, teamB_result, matchPhase=null ){
        // check the phase for the match
        if(phase == 1){
            const result = await db.query(
                `INSERT INTO quinielas_phase_1 
                    (quiniela_id, user_id, match_id, team_a, team_a_result, team_b, team_b_result) 
                VALUES 
                    ($1, $2, $3, $4, $5, $6, $7) 
                RETURNING 
                    id, 
                    match_id AS "matchID", 
                    team_a AS "teamA", 
                    team_a_result AS "teamAResult", 
                    team_b AS "teamB", 
                    team_b_result AS "teamBResult"`, 
            [quinielaID, userID, matchID, teamA_id, teamA_result, teamB_id, teamB_result]);
            return result.rows[0];
        }else if(phase == 2){
            const result = await db.query(
                `INSERT INTO quinielas_phase_2 
                    (quiniela_id, user_id, match_id, match_phase, team_a, team_a_result, team_b, team_b_result) 
                VALUES 
                    ($1, $2, $3, $4, $5, $6, $7, $8) 
                RETURNING 
                    id, 
                    match_id AS "matchID", 
                    match_phase AS "matchPhase", 
                    team_a AS "teamA", 
                    team_a_result AS "teamAResult", 
                    team_b AS "teamB", 
                    team_b_result AS "teamBResult"`, 
            [quinielaID, userID, matchID, matchPhase, teamA_id, teamA_result, teamB_id, teamB_result]);
            return result.rows[0];
        }
    }

    /**
    * Return the list of matches for the quinielas
    *   Returns for phase 1 match: { id, matchID, teamA, teamAResult, teamB, teamBResult, points }
    *   Returns for phase 2 match: { id, matchID, teamA, teamAResult, teamB, teamBResult, points }
    */
     static async matchesList(quinielaID, phase){
        let quinielaMatches;
        // check the phase for the matches
        if(phase == 1){
            const result = await db.query(
                `SELECT 
                    q.id, 
                    q.match_id AS "matchID", 
                    q.team_a AS "teamA_id", 
                    ta.name AS "teamA_name", 
                    ta.short_name AS "teamA_shortName", 
                    q.team_a_result AS "teamA_result", 
                    q.team_b AS "teamB",
                    tb.name AS "teamB_name", 
                    tb.short_name AS "teamB_shortName",
                    q.team_b_result AS "teamB_result",
                    q.points 
                FROM 
                    quinielas_phase_1 AS q 
                
                LEFT JOIN teams AS ta 
                    ON q.team_a = ta.id 
                LEFT JOIN teams AS tb 
                    ON q.team_b = tb.id 
                
                WHERE
                    q.quiniela_id = $1
                GROUP BY 
                    q.id, ta.id, tb.id    
                ORDER BY 
                    q.match_id ASC`,
            [quinielaID]);
            quinielaMatches = result.rows;
        }else if(phase == 2){
            const result = await db.query(
                `SELECT 
                    q.id, 
                    q.match_id AS "matchID", 
                    q.match_phase AS "matchPhase", 
                    q.team_a AS "teamA_id", 
                    ta.name AS "teamA_name", 
                    ta.short_name AS "teamA_shortName", 
                    q.team_a_result AS "teamA_result", 
                    q.team_b AS "teamB",
                    tb.name AS "teamB_name", 
                    tb.short_name AS "teamB_shortName",
                    q.team_b_result AS "teamB_result",
                    q.points 
                FROM 
                    quinielas_phase_2 AS q 
                
                LEFT JOIN teams AS ta 
                    ON q.team_a = ta.id 
                LEFT JOIN teams AS tb 
                    ON q.team_b = tb.id 
                
                WHERE
                    q.quiniela_id = $1
                GROUP BY 
                    q.id, ta.id, tb.id    
                ORDER BY 
                    q.match_id ASC`,
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
                u.username,
                qp.champion_team_id AS "championTeam_ID", 
                t.name AS "championTeam_Name",
                t.short_name AS "championTeam_ShortName",
                qp.points 
            FROM 
                quinielas_points AS qp 
            
            LEFT JOIN users AS u 
                ON qp.user_id = u.id 
            
            LEFT JOIN teams AS t 
                ON qp.champion_team_id = t.id 
            
            WHERE
                qp.status >= 1 
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
                qp.quiniela_id AS "quinielaID", 
                qp.user_id AS "userID", 
                u.first_name AS "userFirstName",
                u.last_name AS "userLastName",
                u.username,
                qp.champion_team_id AS "championTeam_ID", 
                t.name AS "championTeam_Name",
                t.short_name AS "championTeam_ShortName",
                qp.points 
            FROM 
                quinielas_points AS qp 
            
            LEFT JOIN users AS u 
                ON qp.user_id = u.id 
            
            LEFT JOIN teams AS t 
                ON qp.champion_team_id = t.id 
            
            WHERE
                qp.user_id = $1 AND qp.status >= 1 
            ORDER BY 
                qp.points DESC`,
        [userID]);
        
        // find and add the matches list of the quiniela
        let quinielas = [];
        for(let quiniela of result.rows){
            quiniela.matchesPhase1 = await Quiniela.matchesList(quiniela.quinielaID, 1);
            quiniela.matchesPhase2 = await Quiniela.matchesList(quiniela.quinielaID, 2);
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
                qp.champion_team_id AS "championTeam_ID", 
                t.name AS "championTeam_Name",
                t.short_name AS "championTeam_ShortName" 
            FROM 
                quinielas AS q 

            LEFT JOIN quinielas_points AS qp 
                ON q.id = qp.quiniela_id 
            
            LEFT JOIN teams AS t 
                ON qp.champion_team_id = t.id 

            WHERE 
                q.id = $1 AND q.user_id = $2 AND q.status >= 0`,
        [quinielaID, userID]);
        let quiniela = result.rows[0];

        if(!quiniela){
            throw new NotFoundError(`Quiniela/User not found`);
        }
        
        // find and add the matches list of the quiniela
        quiniela.matchesPhase1 = await Quiniela.matchesList(quinielaID, 1);
        quiniela.matchesPhase2 = await Quiniela.matchesList(quinielaID, 2);
        
        return quiniela;
    }


    /**
    * Set quiniela groups standings and to get all classified teams for aech group
    *   Returns classified teams by groups/possitions: { A1: teamID, A2: teamID, B1: teamID, B2: teamID, C1: teamID, C2: teamID, D1: teamID, D2: teamID, E1: teamID, E2: teamID, F1: teamID, F2: teamID, G1: teamID, G2: teamID, H1: teamID, H2: teamID }
    */
     static async setQuinielasClassifiedTeams(userID, matches, formData){
        // delete current standings
        const result = await db.query(
            `DELETE FROM 
                quinielas_groups_standings 
            WHERE 
                user_id = $1`, 
        [userID]);
        
        // set teams list and team standings object
        const teams = new Set();
        let teamStandings = {};        
        
        for(let match of matches){
            let teamA_stan;
            let teamB_stan;
            
            // insert a new team A stats
            const insertSQL = `INSERT INTO quinielas_groups_standings (user_id, "group", team_id) VALUES ($1, $2, $3)`;
            if(!teams.has(match.teamA.id)){
                await db.query(insertSQL, [userID, match.group, match.teamA.id]);
                teams.add(match.teamA.id);
                teamA_stan = {
                    teamID: match.teamA.id,
                    gamesPlayed: 0,
                    gamesWon: 0,
                    gamesDraws: 0,
                    gamesLost: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    goalsDiff: 0,
                    points: 0
                };
            }else{
                teamA_stan = teamStandings[`${match.teamA.shortName}`];
            }
            // insert a new team B stats
            if(!teams.has(match.teamB.id)){
                await db.query(insertSQL, [userID, match.group, match.teamB.id]);
                teams.add(match.teamB.id);
                teamB_stan = {
                    teamID: match.teamB.id,
                    gamesPlayed: 0,
                    gamesWon: 0,
                    gamesDraws: 0,
                    gamesLost: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    goalsDiff: 0,
                    points: 0
                };
            }else{
                teamB_stan = teamStandings[`${match.teamB.shortName}`];
            }

            // set new standings for teams
            // games played
            teamA_stan.gamesPlayed += 1;
            teamB_stan.gamesPlayed += 1;
            // games wons, draws and lost
            let teamA_matchResult = Number(formData[`match_${match.id}_team_a`]);
            let teamB_matchResult = Number(formData[`match_${match.id}_team_b`]);
            if(teamA_matchResult > teamB_matchResult){
                teamA_stan.gamesWon += 1;
                teamB_stan.gamesLost += 1;
                teamA_stan.points += 3;
            }else if(teamA_matchResult < teamB_matchResult){
                teamA_stan.gamesLost += 1;
                teamB_stan.gamesWon += 1;
                teamB_stan.points += 3;
            }else if(teamA_matchResult === teamB_matchResult){
                teamA_stan.gamesDraws += 1;
                teamB_stan.gamesDraws += 1;
                teamA_stan.points += 1;
                teamB_stan.points += 1;
            }
            // // goals for, against, diff
            teamA_stan.goalsFor += teamA_matchResult;
            teamB_stan.goalsFor += teamB_matchResult;
            teamA_stan.goalsAgainst += teamB_matchResult;
            teamB_stan.goalsAgainst += teamA_matchResult;
            teamA_stan.goalsDiff = teamA_stan.goalsFor - teamA_stan.goalsAgainst;
            teamB_stan.goalsDiff = teamB_stan.goalsFor - teamB_stan.goalsAgainst;

            // save local standings
            teamStandings[`${match.teamA.shortName}`] = teamA_stan;
            teamStandings[`${match.teamB.shortName}`] = teamB_stan;
        }

        // get the teams stats after updated to get the classified teams
        for(let team in teamStandings){
            // save standings in database
            const teamStan = teamStandings[team];
            const result = await db.query(
                `UPDATE 
                    quinielas_groups_standings 
                SET 
                    games_played = $1, 
                    games_won = $2, 
                    games_draws = $3, 
                    games_lost = $4, 
                    goals_for = $5, 
                    goals_against = $6, 
                    goals_diff = $7, 
                    points = $8 
                WHERE 
                    user_id = $9 AND team_id = $10`, 
            [teamStan.gamesPlayed, 
            teamStan.gamesWon, 
            teamStan.gamesDraws, 
            teamStan.gamesLost, 
            teamStan.goalsFor, 
            teamStan.goalsAgainst, 
            teamStan.goalsDiff, 
            teamStan.points, 
            userID, 
            teamStan.teamID]);
        }

        const resultStats = await db.query(
            `SELECT 
                qgs.group, 
                qgs.team_id AS "teamID", 
                t.name AS "teamName",
                t.short_name AS "shortName",
                qgs.games_played AS "gamesPlayed", 
                qgs.games_won AS "gamesWon", 
                qgs.games_draws AS "gamesDraws", 
                qgs.games_lost AS "gamesLost", 
                qgs.goals_for AS "goalsFor", 
                qgs.goals_against AS "goalsAgainst", 
                qgs.goals_diff AS "goalsDiff", 
                qgs.points 
            FROM
                quinielas_groups_standings AS qgs 
            
            LEFT JOIN teams AS t 
                ON qgs.team_id = t.id
            
            WHERE 
                qgs.user_id = $1 
            ORDER BY 
                qgs.group ASC, qgs.points DESC, qgs.games_won DESC, qgs.goals_diff DESC`,
        [userID]);

        // return a object with the teams classified for the R16 phase
        return {
            "1A": { teamID: resultStats.rows[0].teamID, teamName: resultStats.rows[0].teamName, teamShortName: resultStats.rows[0].shortName },
            "2A": { teamID: resultStats.rows[1].teamID, teamName: resultStats.rows[1].teamName, teamShortName: resultStats.rows[1].shortName },
            "1B": { teamID: resultStats.rows[4].teamID, teamName: resultStats.rows[4].teamName, teamShortName: resultStats.rows[4].shortName },
            "2B": { teamID: resultStats.rows[5].teamID, teamName: resultStats.rows[5].teamName, teamShortName: resultStats.rows[5].shortName },
            "1C": { teamID: resultStats.rows[8].teamID, teamName: resultStats.rows[8].teamName, teamShortName: resultStats.rows[8].shortName },
            "2C": { teamID: resultStats.rows[9].teamID, teamName: resultStats.rows[9].teamName, teamShortName: resultStats.rows[9].shortName },
            "1D": { teamID: resultStats.rows[12].teamID, teamName: resultStats.rows[12].teamName, teamShortName: resultStats.rows[12].shortName },
            "2D": { teamID: resultStats.rows[13].teamID, teamName: resultStats.rows[13].teamName, teamShortName: resultStats.rows[13].shortName },
            "1E": { teamID: resultStats.rows[16].teamID, teamName: resultStats.rows[16].teamName, teamShortName: resultStats.rows[16].shortName },
            "2E": { teamID: resultStats.rows[17].teamID, teamName: resultStats.rows[17].teamName, teamShortName: resultStats.rows[17].shortName },
            "1F": { teamID: resultStats.rows[20].teamID, teamName: resultStats.rows[20].teamName, teamShortName: resultStats.rows[20].shortName },
            "2F": { teamID: resultStats.rows[21].teamID, teamName: resultStats.rows[21].teamName, teamShortName: resultStats.rows[21].shortName },
            "1G": { teamID: resultStats.rows[24].teamID, teamName: resultStats.rows[24].teamName, teamShortName: resultStats.rows[24].shortName },
            "2G": { teamID: resultStats.rows[25].teamID, teamName: resultStats.rows[25].teamName, teamShortName: resultStats.rows[25].shortName },
            "1H": { teamID: resultStats.rows[28].teamID, teamName: resultStats.rows[28].teamName, teamShortName: resultStats.rows[28].shortName },
            "2H": { teamID: resultStats.rows[29].teamID, teamName: resultStats.rows[29].teamName, teamShortName: resultStats.rows[29].shortName }
        };
    }


    /** 
    * Update all quinielas points for the match updated
    **/
    static async updateMatchPoints(matchID, teamA_id, teamA_result, teamB_id, teamB_result){
        // check classified team
        async function checkClassifiedTeam(quinielaID, userID, phase, teamID){
            const result = await db.query(
                `SELECT 
                    quiniela_id, 
                    user_id 
                FROM
                    quinielas_phase_2  
                WHERE 
                    (quiniela_id=$1 AND user_id=$2 AND match_phase=$3) AND (team_a=$4 OR team_b=$4)`,
            [quinielaID, userID, phase, teamID]);
            
            return result.rows[0] ? true : false;
        }
        // update quinielas total points
        async function updateQuinielaPoints(quinielaID, userID){
            const pointsP1 = await db.query(
                `SELECT 
                    SUM(points) AS "totalPoints" 
                FROM 
                    quinielas_phase_1 
                WHERE 
                    quiniela_id=$1 AND user_id=$2`, 
            [quinielaID, userID]);

            const pointsP2 = await db.query(
                `SELECT 
                    SUM(points) AS "totalPoints" 
                FROM 
                    quinielas_phase_2 
                WHERE 
                    quiniela_id=$1 AND user_id=$2`, 
            [quinielaID, userID]);

            const totalPoints = Number(pointsP1.rows[0].totalPoints) + Number(pointsP2.rows[0].totalPoints);

            await db.query(
                `UPDATE 
                    quinielas_points 
                SET 
                    points=$1 
                WHERE 
                    quiniela_id=$2 AND user_id=$3`, 
            [totalPoints, quinielaID, userID]);
        };

        // set team won/lost or draw
        let matchTeamWon_ID;
        let matchTeamDraw = false;
        if(teamA_result > teamB_result){
            matchTeamWon_ID = teamA_id;
        }else if(teamA_result < teamB_result){
            matchTeamWon_ID = teamB_id;
        }else if(teamA_result === teamB_result){
            matchTeamDraw = true;
        }
        
        // matches for phase 1
        if(matchID >= 1 && matchID <= 48){
            // get all quinielas match info
            const resp = await db.query(
                `SELECT 
                    quiniela_id AS "quinielaID",
                    user_id AS "userID", 
                    team_a_result AS "teamA_result", 
                    team_b_result AS "teamB_result", 
                    points
                FROM
                    quinielas_phase_1  
                WHERE 
                    match_id = $1`,
            [matchID]);
            const quinielas = resp.rows;

            // check each quiniela match to set earned points and update the match points
            quinielas.forEach(async (quiniela) => {
                // set team won/lost or draw from quiniela
                let quinielaTeamWon_ID;
                let quinielaTeamDraw = false;
                if(quiniela.teamA_result > quiniela.teamB_result){
                    quinielaTeamWon_ID = teamA_id;
                }else if(quiniela.teamA_result < quiniela.teamB_result){
                    quinielaTeamWon_ID = teamB_id;
                }else if(quiniela.teamA_result === quiniela.teamB_result){
                    quinielaTeamDraw = true;
                }

                // check results
                let earnedPoints = 0;
                if(quiniela.teamA_result === teamA_result && quiniela.teamB_result === teamB_result){
                    // 5 points for exact result
                    earnedPoints = 5;
                }else if(quinielaTeamWon_ID === matchTeamWon_ID){
                    // 3 points for guessing Winner/Loser team
                    earnedPoints = 3;
                }else if(quinielaTeamDraw === matchTeamDraw && matchTeamDraw === true){
                    // 3 points for scoring a Draw match
                    earnedPoints = 3;
                }

                // update quiniela's match points
                await db.query(
                    `UPDATE  
                        quinielas_phase_1 
                    SET 
                        points=$1 
                    WHERE
                        quiniela_id=$2 AND user_id=$3 AND match_id=$4`, 
                [earnedPoints, quiniela.quinielaID, quiniela.userID, matchID]);

                // update the total general quiniela's points
                await updateQuinielaPoints(quiniela.quinielaID, quiniela.userID);
            });

        // matches for phase 2    
        }else if(matchID >= 49 && matchID <= 64){
            // get all quinielas match info
            const resp = await db.query(
                `SELECT 
                    quiniela_id AS "quinielaID",
                    user_id AS "userID", 
                    match_phase AS "matchPhase", 
                    team_a AS "teamA_ID",
                    team_a_result AS "teamA_result", 
                    team_b AS "teamB_ID",
                    team_b_result AS "teamB_result", 
                    points
                FROM
                    quinielas_phase_2  
                WHERE 
                    match_id = $1`,
            [matchID]);
            const quinielas = resp.rows;

            // check each quiniela match to set earned points and update the match points
            quinielas.forEach(async (quiniela) => {
                // set team won/lost or draw from quiniela
                let quinielaTeamWon_ID;
                if(quiniela.teamA_result > quiniela.teamB_result){
                    quinielaTeamWon_ID = teamA_id;
                }else if(quiniela.teamA_result < quiniela.teamB_result){
                    quinielaTeamWon_ID = teamB_id;
                }

                // check results
                let earnedPoints = 0;
                if(quiniela.teamA_result === teamA_result && quiniela.teamB_result === teamB_result){
                    // 5 points for exact result
                    earnedPoints = 5;
                }else if(quinielaTeamWon_ID === matchTeamWon_ID){
                    // 3 points for guessing Winner/Loser team
                    earnedPoints = 3;
                }

                // check teams
                // 10 points per Classified Team for Round of 16, Quarter Finals and Semifinals
                let classifiedPoints = 0;
                if(quiniela.matchPhase === "R16" || quiniela.matchPhase === "QF" || quiniela.matchPhase === "SF"){
                    classifiedPoints += await checkClassifiedTeam(quiniela.quinielaID, quiniela.userID, quiniela.matchPhase, teamA_id) ? 10 : 0;
                    classifiedPoints += await checkClassifiedTeam(quiniela.quinielaID, quiniela.userID, quiniela.matchPhase, teamB_id) ? 10 : 0;
                }
                // Points per Finalist Team and champion
                if(quiniela.matchPhase === "F"){
                    // 20 points per Finalist team
                    classifiedPoints += await checkClassifiedTeam(quiniela.quinielaID, quiniela.userID, quiniela.matchPhase, teamA_id) ? 20 : 0;
                    classifiedPoints += await checkClassifiedTeam(quiniela.quinielaID, quiniela.userID, quiniela.matchPhase, teamB_id) ? 20 : 0;
                    // 20 points per Champion Team
                    if(quinielaTeamWon_ID === matchTeamWon_ID){
                        classifiedPoints += 20;
                    }
                }      
                
                // set total points
                earnedPoints += classifiedPoints;
                
                // update quiniela's match points
                await db.query(
                    `UPDATE  
                        quinielas_phase_2 
                    SET 
                        points=$1 
                    WHERE
                        quiniela_id=$2 AND user_id=$3 AND match_id=$4`, 
                [earnedPoints, quiniela.quinielaID, quiniela.userID, matchID]);
                
                // update the total general quiniela's points
                await updateQuinielaPoints(quiniela.quinielaID, quiniela.userID);
            });

        }else{
            throw new BadRequestError(`Match ID invalid`);
        }
    }


    /** 
    * Find quiniela of user and deleted
    *   Returns ID
    **/
    static async delete(userID, quinielaID){
        const result = await db.query(
            `SELECT 
                id, 
                user_id 
            FROM 
                quinielas 
            WHERE 
                id = $1 AND user_id = $2`,
        [quinielaID, userID]);
        let quiniela = result.rows[0];

        if(!quiniela){
            throw new NotFoundError(`Quiniela/User not found`);
        }
        
        const resultDelete = await db.query(
            `DELETE FROM 
                quinielas 
            WHERE 
                id = $1 AND user_id = $2 
            RETURNING
                id`,
        [quinielaID, userID]);
        
        return resultDelete.rows[0].id;
    }
}

module.exports = Quiniela;