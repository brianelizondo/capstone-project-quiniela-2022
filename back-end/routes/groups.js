/** Routes for GROUPS */
const express = require("express");
const router = new express.Router();

const Group = require("../models/group");

/** Handle the errors */
const { BadRequestError } = require("../expressError");

/** 
* GET /groups/standings => { groupsStandings: { [{group, teamID, teamName, gamesPlayed, gamesWon, gamesDraws, gamesLost, goalsFor, goalsAgainst, goalsDiff, points}], ...} }
*   Returns the standings for each group/team
**/
router.get("/standings", async function (req, res, next) {
    try {
        const groupsStandings = await Group.getGroupsStandings();
        return res.json({ groupsStandings });
    } catch (err) {
        return next(err);
    }
});

/** 
* GET /groups/:group/matches => { groupsMatches: { [{ id, date, time, stadium, city, group, teamA, teamB, result, status, apiID }], ...} }
*   Returns all matches for a group
*   where "teamA" or "teamB" is { id, name, shortName, apiID }
**/
router.get("/:group/matches", async function (req, res, next) {
    try {
        const groupMatches = await Group.getGroupMatches(req.params.group);
        return res.json({ groupMatches });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;