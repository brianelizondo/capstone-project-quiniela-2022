/** 
* Routes for user authentication
*/
const express = require("express");
const jsonschema = require("jsonschema");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const { BadRequestError } = require("../expressError");

const User = require("../models/user");
const userAuthSchema = require("../schemas/userAuth");

/** 
* POST /auth/token: { username, password } => { token }
*   Returns JWT token which can be used to authenticate further requests
*   Authorization required: none
*/
router.post("/token", async function (req, res, next){
    try {
        const validator = jsonschema.validate(req.body, userAuthSchema);
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        return res.json({ token });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;