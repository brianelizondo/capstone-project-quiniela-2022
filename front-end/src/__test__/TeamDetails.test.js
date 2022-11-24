import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";

import TeamDetails from '../TeamDetails';

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'TeamDetails' component without crashing", () => {
        render(
            <MemoryRouter initialEntries={["/teams/ARG"]}>
                <TeamDetails />
            </MemoryRouter>
        );
        const textFound = screen.getByText("Team Squad");
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'TeamDetails' matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter initialEntries={["/teams/ARG"]}>
                <TeamDetails />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
