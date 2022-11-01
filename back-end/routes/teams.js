/** Routes for MATCHES */
const express = require("express");
const router = new express.Router();

const Team = require("../models/team");

/** Handle the errors */
const { BadRequestError } = require("../expressError");

/** 
* GET / => { teams: [{ id, name, shortName, apiID }, ...] }
*   Returns list of all teams
**/
router.get("/", async function (req, res, next) {
    try {
        const teams = await Team.findAll();
        return res.json({ teams });
    } catch (err) {
        return next(err);
    }
});

/** 
* GET /[shortName] => { team: { id, name, shortName, apiID, apiInfo } }
*   Returns team details
**/
router.get("/:shortname", async function (req, res, next) {
    try {
        const team = await Team.get(req.params.shortname);
        return res.json({ team });
    } catch (err) {
        return next(err);
    }
});

/** 
* GET /[shortName]/stats => { teamStats: { id, date, time, stadium, city, group, teamA, teamB, result, status, apiID } }
*   Returns team stats details
**/
router.get("/:shortname/stats", async function (req, res, next) {
    try {
        const teamStats = await Team.getTeamStats(req.params.shortname);
        return res.json({ teamStats });
    } catch (err) {
        return next(err);
    }
});

/** 
* GET /[shortName]/squad => { teamSquad: { id, date, time, stadium, city, group, teamA, teamB, result, status, apiID } }
*   Returns team squad list
**/
router.get("/:shortname/squad", async function (req, res, next) {
    try {
        const teamSquad = await Team.getTeamSquad(req.params.shortname);
        return res.json({ teamSquad });
    } catch (err) {
        return next(err);
    }
});
  

module.exports = router;