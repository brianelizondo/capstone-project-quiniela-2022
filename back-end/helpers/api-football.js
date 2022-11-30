/** 
*  Helper to handle all API request to get info from API-FOOTBALL
*/
const axios = require("axios");
const { API_FOOTBALL_KEY, API_FOOTBALL_TIMEZONE } = require("../config");
const { BadRequestError } = require("../expressError");
const API_FOOTBALL_BASE_URL = "https://v3.football.api-sports.io/";

class ApiFootball {
    /** 
    * Basic function to get info from the API
    */
    static async apiGetInfo(endpoint){
        const config = {
            baseURL: `https://v3.football.api-sports.io/`,
            headers: {
                "x-rapidapi-key": API_FOOTBALL_KEY,
                "x-rapidapi-host": "v3.football.api-sports.io"
            }
        };
        
        try {
            const response = await axios.get(endpoint, config);
            return response.data.response;
        } catch (err) {
            return next(new BadRequestError(err));
        }
    }


    // FUNCTIONS FOR GET INFO FOR TEAMS
    /** 
    * Get info from the API about a team
    *   Return: { id, name, code, country, founded, national, logo }
    **/
    static async getTeam(apiID){
        let endpoint = `teams?id=${apiID}`;
        let apiResponse = await ApiFootball.apiGetInfo(endpoint);
        return apiResponse[0].team;
    }
    /** 
    * Get info from the API about a team
    *   Return: [{ id, name, code, country, founded, national, logo }, ...]
    **/
     static async getTeams(){
        let endpoint = `teams?league=1&season=2022`;
        let apiResponse = await ApiFootball.apiGetInfo(endpoint);
        return apiResponse;
    }
    /** 
    * Get stats data from the API about a team
    *   Return: { matchesPlayed, matchesWon, matchesDrawn, matchesLost, goalsFor, goalsForAvg, goalsAgainst, goalsAgainstAvg, cardsYellow, cardsRed, cardsYellowAvg, cardsRedAvg, cleanSheet }
    **/
     static async getTeamStats(apiID){
        let endpoint = `teams/statistics?league=1&season=2022&team=${apiID}`;
        let apiResponse = await ApiFootball.apiGetInfo(endpoint);
        return apiResponse;
    }
    /** 
    * Get squad from the API about a team
    *   Return: { team, players }
    *   where team is:      { id, name, logo }
    *         players is:   [{ id, name, age, number, position, photo }, ...]
    **/
     static async getTeamSquad(apiID){
        let endpoint = `players/squads?team=${apiID}`;
        let apiResponse = await ApiFootball.apiGetInfo(endpoint);
        return apiResponse;
    }


    // FUNCTIONS FOR GET INFO FOR MATCHES
    /** 
    * Get info from the API about a match
    **/
     static async getMatch(apiID){
        let endpoint = `fixtures?id=${apiID}`;
        let apiResponse = await ApiFootball.apiGetInfo(endpoint);
        return apiResponse;
    }
    /** 
    * Get info from the API about a match stats
    **/
     static async getMatchStats(apiID){
        const endpoint = `fixtures/statistics?fixture=${apiID}`;
        const apiResponse = await ApiFootball.apiGetInfo(endpoint);
        let statistics = [];
        if(apiResponse.length > 0){
            for(let i=0; i<16; i++){
                const teamsStat = {
                    type: apiResponse[0].statistics[i].type,
                    teamA: apiResponse[0].statistics[i].value,
                    teamB: apiResponse[1].statistics[i].value
                };
                statistics.push(teamsStat);
            }
        }

        return statistics;
    }
    /** 
    * Get info from the API about a matches
    **/
     static async getMatches(){
        let endpoint = `fixtures?league=1&season=2022`;
        let apiResponse = await ApiFootball.apiGetInfo(endpoint);
        return apiResponse;
    }
    /** 
    * Get goals info from the API about a match/team
    **/
     static async getMatchGoals(matchID){
        let endpoint = `fixtures/events?fixture=${matchID}&type=Goal`;
        let apiResponse = await ApiFootball.apiGetInfo(endpoint);
        return apiResponse;
    }
}

module.exports = ApiFootball;