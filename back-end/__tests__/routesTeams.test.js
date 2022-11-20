// Set ENV VAR to "test" before we load anything, so our app's config will use
// testing settings

process.env.NODE_ENV = "test";
const app = require("../app");
const db = require("../db");
const request = require("supertest");

afterAll(async function() {
    await db.end();
});

describe("GET /teams", function(){
    test("get all teams", async function(){
        let response = await request(app).get("/teams");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ teams: expect.any(Array) });
    });
});

describe("GET /teams/:shortname", function(){
    test("get teams details", async function(){
        let response = await request(app).get("/teams/ARG");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ team: expect.any(Object) });
    });

    test("error to get team details of invalid short name", async function(){
        let response = await request(app).get("/teams/ABC");
        expect(response.statusCode).toBe(404);
    });
});

describe("GET /teams/:shortname/stats", function(){
    test("get teams stats", async function(){
        let response = await request(app).get("/teams/ARG/stats");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ teamStats: expect.any(Array) });
    });

    test("error to get team stats of invalid short name", async function(){
        let response = await request(app).get("/teams/ABC/stats");
        expect(response.statusCode).toBe(404);
    });
});

describe("GET /teams/:shortname/squad", function(){
    test("get teams stats", async function(){
        let response = await request(app).get("/teams/ARG/squad");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ teamSquad: expect.any(Array) });
    });

    test("error to get team stats of invalid short name", async function(){
        let response = await request(app).get("/teams/ABC/squad");
        expect(response.statusCode).toBe(404);
    });
});