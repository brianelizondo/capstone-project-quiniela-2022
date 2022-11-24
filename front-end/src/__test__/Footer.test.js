import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from '../Footer';

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'Footer' component without crashing", () => {
        render(<Footer />);
        const textFound = screen.getByText("Brian Elizondo");
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'Footer' matches snapshot", () => {
        const {asFragment} = render(<Footer />);
        expect(asFragment()).toMatchSnapshot();
    });
});