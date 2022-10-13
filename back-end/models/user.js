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
    static async register({ firstName, lastName, email, username, password, isAdmin }){
        const duplicateCheck = await db.query(
            `SELECT 
                email, username
            FROM 
                users 
            WHERE 
                email = $1 OR username = $2`,
        [email, username]);

        if(duplicateCheck.rows[0]){
            throw new BadRequestError(`Duplicate email and/or username: ${email} / ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users 
                (first_name,
                last_name,
                email, 
                username, 
                password,
                is_admin) 
            VALUES 
                ($1, $2, $3, $4, $5, $6) 
            RETURNING 
                id, first_name AS "firstName", last_name AS "lastName", email, username, is_admin AS "isAdmin"`, 
        [
            firstName,
            lastName,
            email,
            username,
            hashedPassword, 
            isAdmin
        ]);
        
        return result.rows[0];
    }

    /** 
    * Find all users
    *   Returns [{ first_name, last_name, email, username, is_admin }, ...]
    **/
    static async findAllActive(){
        const result = await db.query(
            `SELECT 
                first_name AS "firstName",
                last_name AS "lastName",
                username,
                email
            FROM 
                users
            WHERE
                is_admin = false 
            ORDER BY 
                username`
        );

        return result.rows;
    }
}

module.exports = User;
