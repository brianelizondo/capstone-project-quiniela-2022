import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Loading from '../Loading';

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'Loading' component without crashing", () => {
        render(<Loading />);
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'Loading' matches snapshot", () => {
        const {asFragment} = render(<Loading />);
        expect(asFragment()).toMatchSnapshot();
    });
});