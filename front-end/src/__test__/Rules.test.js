import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Rules from '../Rules';

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'Rules' component without crashing", () => {
        render(<Rules />);
        const textFound = screen.getByText("Rules");
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'Rules' matches snapshot", () => {
        const {asFragment} = render(<Rules />);
        expect(asFragment()).toMatchSnapshot();
    });
});