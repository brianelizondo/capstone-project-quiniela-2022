const { BadRequestError } = require("../expressError");
/**
* Fuction to create and assign each team object to the field and delete extras no more needed
*/
function teamObjectAssign(arr){
    const result = arr.map((m) => {
        m.teamA = {
            id: m.teamA_id,
            name: m.teamA_name,
            shortName: m.teamA_shortName,
            apiID: m.teamA_apiID
        };
        delete m.teamA_id;
        delete m.teamA_name;
        delete m.teamA_shortName;
        delete m.teamA_apiID;

        m.teamB = {
            id: m.teamB_id,
            name: m.teamB_name,
            shortName: m.teamB_shortName,
            apiID: m.teamB_apiID
        };
        delete m.teamB_id;
        delete m.teamB_name;
        delete m.teamB_shortName;
        delete m.teamB_apiID;

        // format date and time
        m.date = new Date(m.date).toLocaleDateString('en-us');
        m.time = m.time.toString().split(":").slice(0,2).join(":");

        return m;
    });

    return result;
}

/**
* Fuction to set info from the API to the matches and teams
*/
function setMatchTeamsInfo(matches, matchesAPI){
    let matchesUpdated = [];
    matches.forEach(match => {
        for(let matchAPI of matchesAPI){
            if(match.apiID == matchAPI.fixture.id){
                // set match info
                delete matchAPI.fixture.id;
                delete matchAPI.fixture.date;
                delete matchAPI.fixture.timezone;
                delete matchAPI.fixture.date;
                delete matchAPI.fixture.timestamp;
                delete matchAPI.fixture.periods;
                delete matchAPI.fixture.venue;
                match.apiInfo = matchAPI.fixture;

                //set additional info
                match.apiInfo.goals = {
                    teamA: matchAPI.goals.home,
                    teamB: matchAPI.goals.away
                };
                match.apiInfo.score = {
                    fulltime: {
                        teamA: matchAPI.score.fulltime.home,
                        teamB: matchAPI.score.fulltime.away
                    },
                    extratime: {
                        teamA: matchAPI.score.extratime.home,
                        teamB: matchAPI.score.extratime.away
                    },
                    penalty: {
                        teamA: matchAPI.score.penalty.home,
                        teamB: matchAPI.score.penalty.away
                    }
                }

                // set teamA and teamB info
                match.teamA.apiInfo = matchAPI.teams.home;
                match.teamB.apiInfo = matchAPI.teams.away;
            }
        }
        matchesUpdated.push(match);
    });
    return matchesUpdated;
}

module.exports = { teamObjectAssign, setMatchTeamsInfo }