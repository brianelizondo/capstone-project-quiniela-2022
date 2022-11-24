import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";

import GroupList from '../GroupList';

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'GroupList' component without crashing", () => {
        render(
            <MemoryRouter initialEntries={["/groups"]}>
                <GroupList />
            </MemoryRouter>
        );
        const textFound = screen.getByText("Standings for each group");
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'GroupList' matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter initialEntries={["/groups"]}>
                <GroupList />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("Additional Test", () => {
    it("works when you click on a groups details button go to the group details", async () => {
        render(
            <MemoryRouter initialEntries={["/groups"]}>
                <GroupList />
            </MemoryRouter>
        );
        const user = userEvent.setup()

        waitFor(() => { expect(screen.getByText("Groups in FIFA World Cup 2022")).toBeInTheDocument() });
        waitFor(async () => { await user.click(screen.getAllByRole("button")) });
        waitFor(() => { expect(screen.getByText("Details for group")).toBeInTheDocument() });
    });
});