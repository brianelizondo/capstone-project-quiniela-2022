// Set ENV VAR to "test" before we load anything, so our app's config will use
// testing settings

process.env.NODE_ENV = "test";
const app = require("../app");
const db = require("../db");
const request = require("supertest");

afterAll(async function() {
    await db.end();
});

describe("GET /groups/standings", function(){
    test("get standings of all groups", async function(){
        const response = await request(app).get("/groups/standings");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ groupsStandings: expect.any(Array) });
    });
});

describe("GET /groups/:group/matches", function(){
    test("get matches of a group", async function(){
        const response = await request(app).get("/groups/A/matches");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ groupMatches: expect.any(Array) });
    });

    test("error to get matches of invalid group", async function(){
        const response = await request(app).get("/groups/XYZ/matches");
        expect(response.statusCode).toBe(400);
    });
});