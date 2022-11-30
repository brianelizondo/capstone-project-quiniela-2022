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

const Quiniela = require("./quiniela");

/** Related class and functions for USER object */
class User {
    /** 
    * Authenticate user with username & password
    *   Returns { id, firstName, lastName, email, username, isAdmin }
    *   Throws UnauthorizedError is user not found or wrong password
    **/
    static async authenticate(username, password) {
        // try to find the user first
        const result = await db.query(
            `SELECT 
                id, 
                first_name AS "firstName", 
                last_name AS "lastName", 
                email, 
                username,
                password,  
                is_admin AS "isAdmin" 
            FROM 
                users 
            WHERE 
                username = $1 AND status = 1`,
        [username.toLowerCase()]);
        const user = result.rows[0];

        if(user) {
            // compare hashed password to a new hash from password
            const isValid = await bcrypt.compare(password, user.password);
            if(isValid === true){
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid username/password");
    }
    
    /** 
    * Register user with data
    *   Returns { id, firstName, lastName, email, isAdmin }
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
        [email.toLowerCase(), username.toLowerCase()]);

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
                is_admin,
                status) 
            VALUES 
                ($1, $2, $3, $4, $5, $6, 1) 
            RETURNING 
                id, first_name AS "firstName", last_name AS "lastName", email, username, is_admin AS "isAdmin"`, 
        [
            firstName.toLowerCase(),
            lastName.toLowerCase(),
            email.toLowerCase(),
            username.toLowerCase(),
            hashedPassword, 
            isAdmin
        ]);
        
        return result.rows[0];
    }

    /** 
    * Check if username/email already exist
    *   Returns { username, email }
    **/
    static async checkUsernameEmail({ username, email }){
        let checkResult = {};
        if(username){
            const usernameCheck = await db.query(
                `SELECT 
                    username
                FROM 
                    users 
                WHERE 
                    username = $1`,
            [username.toLowerCase()]);
            checkResult.username = usernameCheck.rows[0] ? true : false;
        }
        
        if(email){
            const emailCheck = await db.query(
                `SELECT 
                    email
                FROM 
                    users 
                WHERE 
                    email = $1`,
            [email.toLowerCase()]);
            checkResult.email = emailCheck.rows[0] ? true : false;
        }

        return checkResult;
    }

    /** 
    * Find all users (only regular users)
    *   Returns [{ id, first_name, last_name, email, username, is_admin }, ...]
    **/
    static async findAllActive(){
        const result = await db.query(
            `SELECT 
                id,     
                first_name AS "firstName",
                last_name AS "lastName",
                username,
                email
            FROM 
                users
            WHERE
                status = 1 AND is_admin = false 
            ORDER BY 
                username`
        );

        return result.rows;
    }

    /** 
    * Given a username, return data about user (only regular users)
    *   Returns { first_name, last_name, username, email, quinielas }
    *   where "quinielas" is [{id, createdAt, endedAt, status}, ...]
    *   Throws NotFoundError if user not found
    **/
    static async get(username) {
        const userRes = await db.query(
            `SELECT 
                id, 
                username,
                first_name AS "firstName",
                last_name AS "lastName",
                username, 
                email 
            FROM 
                users
            WHERE 
                username = $1 AND status = 1 AND is_admin = false`,
        [username.toLowerCase()]);
        const user = userRes.rows[0];

        if(!user){
            throw new NotFoundError(`Username not found: ${username}`);
        } 

        user.quinielas = await Quiniela.findAllActiveByUser(user.id);

        return user;
    }
}

module.exports = User;
