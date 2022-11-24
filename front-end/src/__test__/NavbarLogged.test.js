import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from '../store/store';
let persistor = persistStore(store);

import NavBarLogged from '../NavBarLogged';

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'NavBarLogged' component without crashing", () => {
        render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MemoryRouter>
                        <NavBarLogged />
                    </MemoryRouter>
                </PersistGate>
            </Provider>
        );
        const textFound = screen.getByText("Add New Quiniela");
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'NavBarLogged' matches snapshot", () => {
        const {asFragment} = render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MemoryRouter>
                        <NavBarLogged />
                    </MemoryRouter>
                </PersistGate>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
