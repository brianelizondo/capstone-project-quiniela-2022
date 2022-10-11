/** USER model */
const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Handle the errors */
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");


/** Related class and functions for USER object */
class User {
    /** 
    * Register user with data
    *   Returns { firstName, lastName, email, isAdmin }
    *   Throws BadRequestError on duplicates
    **/
    static async register({ firstName, lastName, email, password, isAdmin }){
        const duplicateCheck = await db.query(
            `SELECT 
                email
            FROM 
                users 
            WHERE email = $1`,
        [email]);

        if(duplicateCheck.rows[0]){
            throw new BadRequestError(`Duplicate email: ${email}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users 
                (first_name,
                last_name,
                email, 
                password,
                is_admin) 
            VALUES 
                ($1, $2, $3, $4, $5) 
            RETURNING 
                first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`, 
        [
            firstName,
            lastName,
            email,
            hashedPassword, 
            isAdmin
        ]);
        
        return result.rows[0];
    }
}

module.exports = User;
