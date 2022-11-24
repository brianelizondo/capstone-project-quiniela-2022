import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from '../store/store';
let persistor = persistStore(store);

import NavBarUnlogged from '../NavBarUnlogged';

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'NavBarUnlogged' component without crashing", () => {
        render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MemoryRouter>
                        <NavBarUnlogged />
                    </MemoryRouter>
                </PersistGate>
            </Provider>
        );
        const textFound = screen.getByText("Login");
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'NavBarUnlogged' matches snapshot", () => {
        const {asFragment} = render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MemoryRouter>
                        <NavBarUnlogged />
                    </MemoryRouter>
                </PersistGate>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
