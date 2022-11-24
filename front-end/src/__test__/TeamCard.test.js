import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";

import TeamCard from '../TeamCard';

const team = {
    id: 9,
    name: "Argentina",
    shortName: "ARG",
    apiID: 26
}

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'TeamCard' component without crashing", () => {
        render(
            <MemoryRouter>
                <TeamCard team={team} />
            </MemoryRouter>
        );
        const textFound = screen.getByText(team.name);
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'TeamCard' matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter>
                <TeamCard team={team} />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});