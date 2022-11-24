import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";

import QuinielaMatchCard from '../QuinielaMatchCard';

const match = {
    id: 1,
    matchID: 1,
    teamA_id: 1,
    teamA_name: "Qatar",
    teamA_shortName: "QAT",
    teamA_result: 0,
    teamB_id: 2,
    teamB_name: "Ecuador",
    teamB_shortName: "ECU",
    teamB_result: 0,
    points: 0
}

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'QuinielaMatchCard' component without crashing", () => {
        render(
            <MemoryRouter>
                <QuinielaMatchCard match={match} />
            </MemoryRouter>
        );
        const textFound = screen.getByText("Match 1");
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'QuinielaMatchCard' matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter>
                <QuinielaMatchCard match={match} />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});