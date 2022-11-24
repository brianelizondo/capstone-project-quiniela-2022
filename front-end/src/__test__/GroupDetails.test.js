import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";

import GroupDetails from '../GroupDetails';

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'GroupDetails' component without crashing", () => {
        render(
            <MemoryRouter initialEntries={["/groups/A"]}>
                <GroupDetails />
            </MemoryRouter>
        );
        const textFound = screen.getByText("Group Standings");
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'GroupDetails' matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter initialEntries={["/groups/A"]}>
                <GroupDetails />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("Additional Test", () => {
    it("works when you click on a team name go to the team details", async () => {
        render(
            <MemoryRouter initialEntries={["/groups/A"]}>
                <GroupDetails />
            </MemoryRouter>
        );
        const user = userEvent.setup()

        waitFor(() => { expect(screen.getByText('Details for group "A"')).toBeInTheDocument() });
        waitFor(async () => { await user.click(screen.getAllByTestId("team-")) });
        waitFor(() => { expect(screen.getByText("Details for the team")).toBeInTheDocument() });
    });

    it("works when you click on a match card go to the match details", async () => {
        render(
            <MemoryRouter initialEntries={["/groups/A"]}>
                <GroupDetails />
            </MemoryRouter>
        );
        const user = userEvent.setup()

        waitFor(() => { expect(screen.getByText('Details for group "A"')).toBeInTheDocument() });
        waitFor(async () => { await user.click(screen.getAllByTestId("match-")) });
        waitFor(() => { expect(screen.getByText("Details and Statistics about the match")).toBeInTheDocument() });
    });
});