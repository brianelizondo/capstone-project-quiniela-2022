/** Routes for QUINIELAS */
const express = require("express");
const jsonschema = require("jsonschema");

const router = new express.Router();

const User = require("../models/user");
const Quiniela = require("../models/quiniela");


/** Handle the errors */
const { BadRequestError } = require("../expressError");


/** 
* GET /[username] => { quinielas: [ {id, createdAt, endedAt, userID, status, matchesPhase1, matchesPhase2 }, ... ] }
*   Returns list of all active quinielas from an user
*   where matchesPhase1: [ {id, matchID, teamAResult, teamBResult }, ... ]
*         matchesPhase2: [ {id, matchID, teamA, teamAResult, teamB, teamBResult }, ... ]
**/
router.get("/:username", async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        const quinielas = await Quiniela.findAllActive(user.id);
        return res.json({ quinielas });
    } catch (err) {
        return next(err);
    }
});

/** 
* POST /add/[username]
*   quiniela must include { userID }
*/
router.post("/add/:username", async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        const quiniela = await Quiniela.create(user.id);
        return res.json({ quiniela });
    } catch (err) {
        return next(err);
    }
});



module.exports = router;