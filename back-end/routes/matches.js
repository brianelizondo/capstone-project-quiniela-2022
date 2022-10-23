/** Routes for MATCHES */
const express = require("express");
const router = new express.Router();

const Match = require("../models/match");

/** Handle the errors */
const { BadRequestError } = require("../expressError");

/** 
* GET /phase/[id] => { matches: [{ id, date, time, stadium, city, group, teamA, teamB, result, status, apiID }, ...] }
*   where "teamA" or "teamB" is { id, name, shortName, apiID }
*   Returns list of all matches in the phase
**/
router.get("/phase/:phase", async function (req, res, next) {
    try {
        const matches = await Match.findAll(req.params.phase);
        return res.json({ matches });
    } catch (err) {
        return next(err);
    }
});

/** 
* GET /phase/[id]/match/[id] => { match: { id, date, time, stadium, city, group, teamA, teamB, result, status, apiID } }
*   where "teamA" or "teamB" is { id, name, shortName, apiID }
*   Returns details about match in the phase
**/
router.get("/phase/:phase/match/:match", async function (req, res, next) {
    try {
        const match = await Match.getMatch(req.params.phase, req.params.match);
        return res.json({ match });
    } catch (err) {
        return next(err);
    }
});

/** 
* GET /groups/standings => { groupsStandings: { [{group, teamID, teamName, gamesPlayed, gamesWon, gamesDraws, gamesLost, goalsFor, goalsAgainst, goalsDiff, points}], ...} }
*   Returns the standings for each group/team
**/
router.get("/groups/standings", async function (req, res, next) {
    try {
        const groupsStandings = await Match.getGroupsStandings();
        return res.json({ groupsStandings });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;