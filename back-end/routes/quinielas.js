/** Routes for QUINIELAS */
const express = require("express");
const jsonschema = require("jsonschema");

const router = new express.Router();

const User = require("../models/user");
const Quiniela = require("../models/quiniela");


/** Handle the errors */
const { BadRequestError } = require("../expressError");


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