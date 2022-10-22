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
* GET /phase/[id]/match/[id] => { match: { id, date, time, stadium, city, group, teamA, teamB, result, status, apiID } }
*   Returns match details
**/
router.get("/:shortname", async function (req, res, next) {
    try {
        const team = await Team.get(req.params.shortname);
        return res.json({ team });
    } catch (err) {
        return next(err);
    }
});
  

module.exports = router;