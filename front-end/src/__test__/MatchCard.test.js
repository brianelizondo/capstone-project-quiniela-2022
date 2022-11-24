import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";

import MatchCard from '../MatchCard';

const match = {
    id: 1,
    date: "11/20/2022",
    time: "11:00",
    stadium: "stadium",
    city: "city",
    group: "A",
    teamA: {
        id: 1,
        name: "Qatar",
        shortName: "QAT",
        apiID: 1569
    },
    teamA_result: 0,
    teamB: {
        id: 2,
        name: "Ecuador",
        shortName: "ECU",
        apiID: 2382
    },
    teamB_result: 0,
    status: 1,
    apiID: 855736
}

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'MatchCard' component without crashing", () => {
        render(
            <MemoryRouter>
                <MatchCard match={match} />
            </MemoryRouter>
        );
        const textFound = screen.getByText("Match 1");
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'MatchCard' matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter>
                <MatchCard match={match} />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});