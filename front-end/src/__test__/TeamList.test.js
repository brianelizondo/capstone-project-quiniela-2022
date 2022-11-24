import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";

import TeamList from '../TeamList';

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'TeamList' component without crashing", () => {
        render(
            <MemoryRouter initialEntries={["/teams"]}>
                <TeamList />
            </MemoryRouter>
        );
        const textFound = screen.getByText("Teams in FIFA World Cup 2022");
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'TeamList' matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter initialEntries={["/teams"]}>
                <TeamList />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("Additional Test", () => {
    it("works when you click on a team card go to the team details", async () => {
        render(
            <MemoryRouter initialEntries={["/teams"]}>
                <TeamList />
            </MemoryRouter>
        );
        const user = userEvent.setup()

        waitFor(() => { expect(screen.getByText("List of all teams competing")).toBeInTheDocument() });
        waitFor(async () => { await user.click(screen.getAllByTestId("team-")) });
        waitFor(() => { expect(screen.getByText("Details for the team")).toBeInTheDocument() });
    });
});