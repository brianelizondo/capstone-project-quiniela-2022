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
    * Get info from the API about a matches
    **/
     static async getMatches(){
        let endpoint = `fixtures?league=1&season=2022`;
        let apiResponse = await ApiFootball.apiGetInfo(endpoint);
        return apiResponse;
    }
}

module.exports = ApiFootball;