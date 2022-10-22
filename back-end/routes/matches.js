/** Routes for MATCHES */
const express = require("express");
const router = new express.Router();

const Match = require("../models/match");

/** Handle the errors */
const { BadRequestError } = require("../expressError");

/** 
* GET /phase/[id] => { matches: [{ id, date, time, stadium, city, group, teamA, teamB, result, status, apiID }, ...] }
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
*   Returns match details
**/
router.get("/phase/:phase/match/:match", async function (req, res, next) {
    try {
        const match = await Match.get(req.params.phase, req.params.match);
        return res.json({ match });
    } catch (err) {
        return next(err);
    }
});
  

module.exports = router;