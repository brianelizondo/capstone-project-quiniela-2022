// Set ENV VAR to "test" before we load anything, so our app's config will use
// testing settings

process.env.NODE_ENV = "test";
const app = require("../app");
const db = require("../db");
const request = require("supertest");
const bcrypt = require("bcrypt");
const { createToken } = require("../helpers/tokens");

// tokens for sample users
let sampleUser = {
    firstName: 'fn',
    lastName: 'ln',
    email: 'email1@test.com',
    username: 'usertest',
    password: '123456789'
};
let adminUser = {};

beforeAll(async function() {
    async function _pwd(password) {
        return await bcrypt.hash(password, 1);
    }

    const resultUser = await db.query(`
        INSERT INTO users 
            (first_name, last_name, email, username, password, is_admin, status) 
        VALUES 
            ($1, $2, $3, $4, $5, $6, $7)
        RETURNING 
            id, first_name AS "firstName", last_name AS "lastName", email, username, is_admin AS "isAdmin"`
    , ["fn", "ln", "admin@test.com", "adminuser", await _pwd("123456789"), true, 1]);
    adminUser = resultUser.rows[0];
    
    // create tokens for users
    sampleUser.token = createToken(sampleUser);
    adminUser.token = createToken(resultUser.rows[0]);
});

afterAll(async function() {
    await db.query("DELETE FROM users");
    await db.end();
});

describe("POST /register", function(){
    test("register a new user (email does not exist)", async function(){
        const response = await request(app)
            .post("/users/register")
            .send(sampleUser);
        expect(response.statusCode).toBe(201);
        expect(response.body.id).toEqual(expect.any(Number));
        expect(response.body.username).toEqual(sampleUser.username);
        expect(response.body.isAdmin).toEqual(expect.any(Boolean));
    });

    test("error to register a new user (email is already registered)", async function(){
        const response = await request(app)
            .post("/users/register")
            .send(sampleUser);
        expect(response.statusCode).toBe(400);
    });
});

describe("POST /register/check", function(){
    test("check username/email is already registered (true for registered)", async function(){
        const response = await request(app)
            .post("/users/register/check")
            .send({
                username: sampleUser.username,
                email: sampleUser.email
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.username).toBe(true);
        expect(response.body.email).toBe(true);
    });

    test("check username/email is not registered (false for not registered)", async function(){
        const response = await request(app)
            .post("/users/register/check")
            .send({
                username: "newusertest",
                email: "email-no@registered.com"
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.username).toBe(false);
        expect(response.body.email).toBe(false);
    });

    test("check username registered and email not registered", async function(){
        const response = await request(app)
            .post("/users/register/check")
            .send({
                username: sampleUser.username,
                email: "email-no@registered.com"
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.username).toBe(true);
        expect(response.body.email).toBe(false);
    });

    test("check username registered and email not registered", async function(){
        const response = await request(app)
            .post("/users/register/check")
            .send({
                username: "newusertest",
                email: sampleUser.email
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.username).toBe(false);
        expect(response.body.email).toBe(true);
    });
});

describe("GET /", function(){
    test("get all active users (only for admins users)", async function(){
        const response = await request(app)
            .get("/users")
            .set({ authorization: adminUser.token });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ users: expect.any(Array) });
    });

    test("get all active users (only for admins users)", async function(){
        const response = await request(app)
            .get("/users")
            .set({ authorization: sampleUser.token });
        expect(response.statusCode).toBe(401);
    });
});

describe("GET /:username", function(){
    test("get user info (for admins users)", async function(){
        const response = await request(app)
            .get(`/users/${sampleUser.username}`)
            .set({ authorization: adminUser.token });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ user: expect.any(Object) });
    });

    test("get user info (for same users)", async function(){
        const response = await request(app)
            .get(`/users/${sampleUser.username}`)
            .set({ authorization: sampleUser.token });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ user: expect.any(Object) });
    });

    test("error to get user info (for different user)", async function(){
        const response = await request(app)
            .get(`/users/otheruser`)
            .set({ authorization: sampleUser.token });
        expect(response.statusCode).toBe(401);
    });
});