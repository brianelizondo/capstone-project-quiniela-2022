import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** 
* APIFootball Class to connect front-end with the back-end
*   Static class tying together methods used to get/send to the API
*/
class APIFootball {
    // Static method to make each request to the back-end api
    static async request(endpoint, data = {}, method = "get"){
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${APIFootball.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes requests
    // USERS requests

    // QUINIELAS requests
    /** Get all quinielas active */
    static async getQuinielas(){
        let res = await this.request(`quinielas/`);
        return res.quinielas;
    }

    // GROUPS requests
    /** Get all groups standings */
    static async getGroupsStandings(){
        let res = await this.request(`groups/standings/`);
        return res.groupsStandings;
    }
    /** Get all matches for a group */
    static async getGroupMatches(group){
        let res = await this.request(`groups/${group}/matches/`);
        return res.groupMatches;
    }

    // MATCHES requests
    /** Get all matches for a phase */
    static async getPhaseMatches(phase){
        let res = await this.request(`matches/phase/${phase}/`);
        return res.matches;
    }
    /** Get match details */
    static async getMatchDetails(matchID, phase){
        let res = await this.request(`matches/phase/${phase}/match/${matchID}/`);
        return res.match;
    }

    // TEAMS requests
    /** Get all matches for a phase */
    static async getTeams(){
        let res = await this.request(`teams/`);
        return res.teams;
    }
    /** Get info about a team */
    static async getTeam(shortName){
        let res = await this.request(`teams/${shortName}/`);
        return res.team;
    }
    /** Get stats about a team */
    static async getTeamStats(shortName){
        let res = await this.request(`teams/${shortName}/stats/`);
        return res.teamStats;
    }
    /** Get squad about a team */
    static async getTeamSquad(shortName){
        let res = await this.request(`teams/${shortName}/squad/`);
        return res.teamSquad;
    }

}

APIFootball.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
                    "eyJ1c2VybmFtZSI6InJlZ3VsYXJ1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY2NjY1NzY4N30." + 
                    "IdD8TZi5mjjBiLzyD9FDSnau3f-s84eIZftXlVhUWo0";

export default APIFootball;