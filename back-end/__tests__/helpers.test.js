const { teamObjectAssign } = require("../helpers/helpers");

let testArr = [];

beforeEach(function() {
    testArr.push({
        id: 1,
        date: "01/01/2022", 
        time: "18:00",  
        stadium: "stadium name", 
        city: "city name", 
        group: "A", 
        teamA: 1,
        teamA_result: 0, 
        teamB: 2, 
        teamB_result: 1, 
        status: 1, 
        apiID: 12345, 
        teamA_id: 1, 
        teamA_name: "Team A Name", 
        teamA_shortName: "TAN", 
        teamA_apiID: 123,
        teamB_id: 2, 
        teamB_name: "Team B Name", 
        teamB_shortName: "TBN", 
        teamB_apiID: 456
    });
});

describe("teamObjectAssign function", function () {
    test("works: retun a new team object to the field and delete extras no more needed", function () {
        const result = teamObjectAssign(testArr);
        expect(result).toEqual([{ 
            ...testArr[0], 
            teamA: {
                id: 1, 
                name: "Team A Name", 
                shortName: "TAN", 
                apiID: 123
            },
            teamB: {
                id: 2, 
                name: "Team B Name", 
                shortName: "TBN", 
                apiID: 456
            }
        }]);
    });
    test("works: retun the same items quantity", function () {
        const result = teamObjectAssign(testArr);
        expect(result.lenght).toEqual(testArr.lenght);
    });
});