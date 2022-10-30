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
    static async getGroupsStandings(){
        let res = await this.request(`matches/groups/standings/`);
        return res.groupsStandings;
    }

    // MATCHES requests

    // TEAMS requests

}

APIFootball.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
                    "eyJ1c2VybmFtZSI6InJlZ3VsYXJ1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY2NjY1NzY4N30." + 
                    "IdD8TZi5mjjBiLzyD9FDSnau3f-s84eIZftXlVhUWo0";

export default APIFootball;