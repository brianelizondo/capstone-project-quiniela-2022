/** Routes for USERS */
const express = require("express");
const jsonschema = require("jsonschema");
const { ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");

const router = new express.Router();

const User = require("../models/user");
const userRegisterSchema = require("../schemas/userRegister.json");

/** Handle the errors */
const { BadRequestError } = require("../expressError");


/** 
* POST /users/register:   { user } => { newUser }
*   user must include { firstName, lastName, email, username, password }
*   Returns JWT token which can be used to authenticate further requests.
*   Authorization required: none
*/
router.post("/register", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userRegisterSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const newUser = await User.register({ ...req.body, isAdmin: false });
        return res.status(201).json(newUser);
    } catch (err) {
        return next(err);
    }
});


/** 
* POST /users/register/check:   { user } => { userCheck }
*   user must include { email, username }
*   Returns if the username or email already exists
*       { username: true/false, email: true/false }
*   Authorization required: none
*/
router.post("/register/check", async function (req, res, next) {
    try {
        const userCheck = await User.checkUsernameEmail(req.body);
        return res.json(userCheck);
    } catch (err) {
        return next(err);
    }
});


/** 
* GET / => { users: [ {firstName, lastName, username, email }, ... ] }
*   Returns list of all not admin users
**/
router.get("/", ensureAdmin, async function (req, res, next) {
    try {
        const users = await User.findAllActive();
        return res.json({ users });
    } catch (err) {
        return next(err);
    }
});


/** 
* GET /[username] => { user: {firstName, lastName, username, email } }
*   Returns { id, firstName, lastName, username, email }
**/
router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});
  

module.exports = router;