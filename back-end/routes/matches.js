/** Routes for MATCHES */
const express = require("express");
const router = new express.Router();
const { ensureAdmin  } = require("../middleware/auth");

const Match = require("../models/match");
const God = require("../models/god");

/** Handle the errors */
const { BadRequestError } = require("../expressError");

/** 
* GET /goals => { goals: [{ matchID }, ...] }
*   where "matchID" is { teamA, teamB }
*   where "teamA" or "teamB" is { time, player, type }
*   Returns list of all goals of matches
**/
router.get("/goals", async function (req, res, next) {
    try {
        const goals = await Match.getAllGoals();
        return res.json({ goals });
    } catch (err) {
        return next(err);
    }
});

/** 
* GET /[id]/goals => { goals: { matchID } }
*   where "matchID" is { teamA, teamB }
*   where "teamA" or "teamB" is { time, player, type }
*   Returns list of all goals of matches
**/
router.get("/:id/goals", async function (req, res, next) {
    try {
        const goals = await Match.getMatchGoals(req.params.id);
        return res.json({ goals });
    } catch (err) {
        return next(err);
    }
});

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
* PATCH /[id]/update
*   Returns details about match updated
**/
router.patch("/:match/update", ensureAdmin, async function (req, res, next) {
    try {
        const matchUpdated = await God.updateGoalsTeams(req.params.match, req.body.matchData);
        return res.json({ matchUpdated });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;