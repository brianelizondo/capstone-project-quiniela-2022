import React from 'react';
import { useSelector } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';

function NavBarLogged({ logout }) {
    const user = useSelector((state) => state.user);

    return (
        <>
        <NavDropdown.Item href={`/users/${user.username}/profile`}>Profile</NavDropdown.Item>
        <NavDropdown.Item href={`/quinielas/${user.username}`}>My Quiniela's</NavDropdown.Item>
        <NavDropdown.Item href={`/quinielas/${user.username}/add`}>Add Quiniela</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
        </>
    );
}

export default NavBarLogged;