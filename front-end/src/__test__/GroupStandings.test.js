import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";

import GroupStandings from '../GroupStandings';

const groupsStandings = [
    {
        group: "A",
        teamID: 1,
        teamName: "Qatar",
        shortName: "QAT",
        gamesPlayed: 0,
        gamesWon: 0,
        gamesDraws: 0,
        gamesLost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalsDiff: 0,
        points: 0
    }
];

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'GroupStandings' component without crashing", async () => {
        render(
            <MemoryRouter initialEntries={["/groups/A"]}>
                <GroupStandings group={ "A" } standings={ groupsStandings } detailsButton={false} />
            </MemoryRouter>
        );
        const textFound = screen.getByText("Points");
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'GroupStandings' matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter initialEntries={["/groups/A"]}>
                <GroupStandings group={ "A" } standings={ groupsStandings } detailsButton={false} />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("Additional Test", () => {
    it("works when you click on a team name", async () => {
        render(
            <MemoryRouter initialEntries={["/groups/A"]}>
                <GroupStandings group={ "A" } standings={ groupsStandings } detailsButton={false} />
            </MemoryRouter>
        );
        expect(screen.getByText("Group A")).toBeInTheDocument();
        
        // expect a test element to go team details after click
        expect(screen.findByTestId(`team-${groupsStandings[0].shortName}`));
    });
});