import React from 'react';
import { NavDropdown } from 'react-bootstrap';

// options to show when the user is unlogged
function NavBarUnlogged() {
    return (
        <>
        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
        <NavDropdown.Item href="/register">Register</NavDropdown.Item>
        </>
    );
}

export default NavBarUnlogged;