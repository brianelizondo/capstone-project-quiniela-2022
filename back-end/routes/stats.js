/** Routes for QUINIELAS */
const express = require("express");
const router = new express.Router();
const { ensureLoggedIn, ensureAdmin, ensureCorrectUserOrAdmin  } = require("../middleware/auth");

const User = require("../models/user");
const Quiniela = require("../models/quiniela");

/** Handle the errors */
const { BadRequestError } = require("../expressError");

/** 
* POST /[username]/standings
*   data must include { groupsMatches, formData }
*/
router.post("/quinielas/:username/groups", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        const stats = await Quiniela.setQuinielasClassifiedTeams(user.id, req.body.matches, req.body.formData);
        return res.json({ stats });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;