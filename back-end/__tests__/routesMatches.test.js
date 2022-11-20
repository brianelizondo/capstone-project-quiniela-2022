// Set ENV VAR to "test" before we load anything, so our app's config will use
// testing settings

process.env.NODE_ENV = "test";
const app = require("../app");
const db = require("../db");
const request = require("supertest");

afterAll(async function() {
    await db.end();
});

describe("GET /matches/phase/:phase", function(){
    test("get all matches of a phase", async function(){
        let response = await request(app).get("/matches/phase/1");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ matches: expect.any(Array) });

        response = await request(app).get("/matches/phase/2");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ matches: expect.any(Array) });
    });

    test("error to get matches of invalid phase", async function(){
        let response = await request(app).get("/matches/phase/9");
        expect(response.statusCode).toBe(404);

        response = await request(app).get("/matches/phase/A");
        expect(response.statusCode).toBe(404);
    });
});

describe("GET /matches/phase/:phase/match/:match", function(){
    test("get match details of a phase", async function(){
        let response = await request(app).get("/matches/phase/1/match/1");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ match: expect.any(Object) });

        response = await request(app).get("/matches/phase/2/match/49");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ match: expect.any(Object) });
    });

    test("error to get match details of invalid phase", async function(){
        let response = await request(app).get("/matches/phase/9/match/1");
        expect(response.statusCode).toBe(404);

        response = await request(app).get("/matches/phase/A/match/1");
        expect(response.statusCode).toBe(404);
    });

    test("error to get match details of invalid match id", async function(){
        let response = await request(app).get("/matches/phase/1/match/49");
        expect(response.statusCode).toBe(404);

        response = await request(app).get("/matches/phase/2/match/1");
        expect(response.statusCode).toBe(404);

        response = await request(app).get("/matches/phase/1/match/A");
        expect(response.statusCode).toBe(500);
    });
});