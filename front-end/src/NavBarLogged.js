import React from 'react';
import { NavDropdown } from 'react-bootstrap';

function NavBarLogged() {
    return (
        <>
        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
        <NavDropdown.Item href="/quinielas/:username">My Quiniela's</NavDropdown.Item>
        <NavDropdown.Item href="/quinielas/:username/add">Add Quiniela</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
        </>
    );
}

export default NavBarLogged;