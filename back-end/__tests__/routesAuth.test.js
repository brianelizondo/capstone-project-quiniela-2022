// Set ENV VAR to "test" before we load anything, so our app's config will use
// testing settings

process.env.NODE_ENV = "test";
const app = require("../app");
const db = require("../db");
const request = require("supertest");
const bcrypt = require("bcrypt");
const { createToken } = require("../helpers/tokens");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require("../config");

// tokens for sample users
let tokens = {};
let sampleUsers = [];

beforeAll(async function() {
    async function _pwd(password) {
        return await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    }
  
    sampleUsers.push(["fn", "ln", "regular@test.com", "usertest", await _pwd("123456789"), false, 1]);
    sampleUsers.push(["fn", "ln", "admin@test.com", "adminuser", await _pwd("123456789"), true, 1]);
  
    for(let user of sampleUsers) {
        const resultUser = await db.query(`
            INSERT INTO users 
                (first_name, last_name, email, username, password, is_admin, status) 
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7)
            RETURNING 
                id, first_name AS "firstName", last_name AS "lastName", email, username, is_admin AS "isAdmin"`
        , user);
        tokens[user[3]] = createToken(resultUser.rows[0]);
    }
});

afterAll(async function() {
    await db.query("DELETE FROM users");
    await db.end();
});

describe("POST /auth/token", function(){
    test("should allow a correct username/password to log in", async function() {
        const response = await request(app)
            .post("/auth/token")
            .send({
                username: "usertest",
                password: "123456789"
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ user: expect.any(Object), token: expect.any(String) });

        let { username, isAdmin } = jwt.verify(response.body.token, SECRET_KEY);
        expect(username).toBe("usertest");
        expect(isAdmin).toBe(false);
    });

    test("Responds with 401 invalid username/password", async function() {
        const response = await request(app)
            .post("/auth/token")
            .send({
                username: "incorrectuser",
                password: "123456789"
            });
        expect(response.statusCode).toBe(401);
    });
});