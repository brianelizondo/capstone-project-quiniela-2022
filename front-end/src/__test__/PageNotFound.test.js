import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PageNotFound from '../PageNotFound';

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'PageNotFound' component without crashing", () => {
        render(<PageNotFound />);
        const textFound = screen.getByText("404 page");
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'PageNotFound' matches snapshot", () => {
        const {asFragment} = render(<PageNotFound />);
        expect(asFragment()).toMatchSnapshot();
    });
});