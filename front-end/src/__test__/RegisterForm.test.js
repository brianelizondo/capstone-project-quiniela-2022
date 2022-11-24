import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';

import RegisterForm from '../RegisterForm';

// Smoke Test
describe("Smoke Test", () => {
    it("renders 'RegisterForm' component without crashing", () => {
        const userRegister = jest.fn();
        const checkUsernameEmail = jest.fn();
        render(
            <MemoryRouter initialEntries={["/register"]}>
                <RegisterForm userRegister={userRegister} checkUsernameEmail={checkUsernameEmail} />
            </MemoryRouter>
        );
        const textFound = screen.getByText("Register to Quinielas World Cup 2022");
        expect(textFound).toBeInTheDocument();
    });
});

// Snapshot Tests
describe("Snapshot Test", () => {
    it("'RegisterForm' matches snapshot", () => {
        const userRegister = jest.fn();
        const checkUsernameEmail = jest.fn();
        const {asFragment} = render(
            <MemoryRouter initialEntries={["/register"]}>
                <RegisterForm userRegister={userRegister} checkUsernameEmail={checkUsernameEmail} />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("Additional Test", () => {
    it("should show a required field warning for each empty input field", async () => {
        const userRegister = jest.fn();
        const checkUsernameEmail = jest.fn();
        render(
            <MemoryRouter initialEntries={["/register"]}>
                <RegisterForm userRegister={userRegister} checkUsernameEmail={checkUsernameEmail} />
            </MemoryRouter>
        );
        const user = userEvent.setup();
    
        await user.click(screen.getByRole("button", {type: /Register!/i}));
        const warnings = await screen.findAllByText("Required");
        expect(warnings[0]).toBeVisible();
    });

    it("should show invalid field errors for each invalid input field", async () => {
        const userRegister = jest.fn();
        const checkUsernameEmail = jest.fn();
        render(
            <MemoryRouter initialEntries={["/register"]}>
                <RegisterForm userRegister={userRegister} checkUsernameEmail={checkUsernameEmail} />
            </MemoryRouter>
        );
        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/First Name/i), '1234');
        await user.type(screen.getByLabelText(/Last Name/i), '1234');
        await user.click(screen.getByRole("button", {type: /Register!/i}));
        let warnings = await screen.findAllByText("Only letters are allowed");
        expect(warnings[0]).toBeVisible();

        await user.type(screen.getByLabelText(/Email/i), '1234');
        await user.click(screen.getByRole("button", {type: /Register!/i}));
        warnings = await screen.findAllByText("Invalid email address");
        expect(warnings[0]).toBeVisible();

        await user.type(screen.getByLabelText(/Username/i), '1234');
        await user.type(screen.getByLabelText(/Password/i), '1234');
        await user.click(screen.getByRole("button", {type: /Register!/i}));
        warnings = await screen.findAllByText("Must be 8 characters or more");
        expect(warnings[0]).toBeVisible();

        await user.type(screen.getByLabelText(/Username/i), '1234....');
        await user.type(screen.getByLabelText(/Password/i), '1234....');
        await user.click(screen.getByRole("button", {type: /Register!/i}));
        warnings = await screen.findAllByText("Only letters and numbers are allowed");
        expect(warnings[0]).toBeVisible();
    });
});