import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";

import Home from '../Home';

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'Home' component without crashing", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const textFound = screen.getByText("List of active and participating quinielas");
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'Home' matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("Additional Test", () => {
    it("works when you click on a quiniela card go to the quiniela details", async () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const user = userEvent.setup()

        waitFor(() => { expect(screen.getByText("List of active and participating quinielas")).toBeInTheDocument() });
        waitFor(async () => { await user.click(screen.getAllByTestId("quiniela-")) });
        waitFor(() => { expect(screen.getByText("Champion team of this Quiniela")).toBeInTheDocument() });
    });
});