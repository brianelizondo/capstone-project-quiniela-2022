/** Routes for QUINIELAS */
const express = require("express");
const router = new express.Router();
const { ensureLoggedIn, ensureAdmin, ensureCorrectUserOrAdmin  } = require("../middleware/auth");

const User = require("../models/user");
const Quiniela = require("../models/quiniela");


/** Handle the errors */
const { BadRequestError } = require("../expressError");

/** 
* GET / => { quinielas: [ { quinielaID, userID, userFirstName, userLastName, championTeamID, championTeamName, points }, ... ] }
*   Returns list of all active quinielas
**/
router.get("/", async function (req, res, next) {
    try {
        const quinielas = await Quiniela.findAllActive();
        return res.json({ quinielas });
    } catch (err) {
        return next(err);
    }
});

/** 
* GET /[username] => { quinielas: [ {id, createdAt, endedAt, userID, status, matchesPhase1, matchesPhase2 }, ... ] }
*   Returns list of all active quinielas from an user
*   where matchesPhase1: [ {id, matchID, teamAResult, teamBResult }, ... ]
*         matchesPhase2: [ {id, matchID, teamA, teamAResult, teamB, teamBResult }, ... ]
**/
router.get("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        const quinielas = await Quiniela.findAllActiveByUser(user.id);
        return res.json({ quinielas });
    } catch (err) {
        return next(err);
    }
});

/** 
* GET /[username]/[id] => { quiniela: [ {id, createdAt, endedAt, userID, status, matchesPhase1, matchesPhase2 }, ... ] }
*   Returns quiniela details of user
*   where matchesPhase1: [ {id, matchID, teamAResult, teamBResult }, ... ]
*         matchesPhase2: [ {id, matchID, teamA, teamAResult, teamB, teamBResult }, ... ]
**/
router.get("/:username/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        const quiniela = await Quiniela.findDetails(user.id, parseInt(req.params.id));
        return res.json({ quiniela });
    } catch (err) {
        return next(err);
    }
});

/** 
* POST /[username]/add
*   quiniela must include { userID, matchesData, formData }
*/
router.post("/:username/add", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const quiniela = await Quiniela.create(req.body.user.id, req.body.matchesData, req.body.formData); 
        return res.json({ quiniela });
    } catch (err) {
        return next(err);
    }
});

/** 
* DELETE /[username]/[id]
*   Returns ID of quiniela deleted
**/
router.delete("/:username/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        const quiniela = await Quiniela.delete(user.id, parseInt(req.params.id));
        return res.json({ deleted: quiniela });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;