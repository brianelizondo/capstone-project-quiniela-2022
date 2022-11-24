import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from '../store/store';
import App from '../App';
let persistor = persistStore(store);

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'App' component without crashing", async () => {
        render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        );
        const textFound = screen.getByText("Quinielas World Cup 2022");
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'App' matches snapshot", () => {
        const {asFragment} = render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});