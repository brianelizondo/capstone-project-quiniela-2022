import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from '../store/store';
import LoginForm from '../LoginForm';
let persistor = persistStore(store);

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'LoginForm' component without crashing", () => {
        const userAuthenticate = jest.fn();
        render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <LoginForm userAuthenticate={userAuthenticate} />
                </PersistGate>
            </Provider>
        );
        const textFound = screen.getByText("Login to Quinielas World Cup 2022");
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'LoginForm' matches snapshot", () => {
        const userAuthenticate = jest.fn();
        const {asFragment} = render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <LoginForm userAuthenticate={userAuthenticate} />
                </PersistGate>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("Additional Test", () => {
    it("should show a required field warning for each empty input field", async () => {
        const userAuthenticate = jest.fn();
        render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <LoginForm userAuthenticate={userAuthenticate} />
                </PersistGate>
            </Provider>
        );
        const user = userEvent.setup();
    
        await user.click(screen.getByRole("button", {type: /Login!/i}));
        const warnings = await screen.findAllByText("Required");
        expect(warnings[0]).toBeVisible();
    });

    it("should show invalid field errors for each invalid input field", async () => {
        const userAuthenticate = jest.fn();
        render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <LoginForm userAuthenticate={userAuthenticate} />
                </PersistGate>
            </Provider>
        );
        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/username/i), 'test');
        await user.type(screen.getByLabelText(/password/i), '12345')
        await user.click(screen.getByRole("button", {type: /Login!/i}));
        let warnings = await screen.findAllByText("Must be 8 characters or more");
        expect(warnings[0]).toBeVisible();

        await user.type(screen.getByLabelText(/username/i), 'testuser..');
        await user.type(screen.getByLabelText(/password/i), '12345..')
        await user.click(screen.getByRole("button", {type: /Login!/i}));
        warnings = await screen.findAllByText("Only letters and numbers are allowed");
        expect(warnings[0]).toBeVisible();
    });
});