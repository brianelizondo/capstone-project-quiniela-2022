import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
import { Nav, NavDropdown } from 'react-bootstrap';
import './NavBar.css';

import NavBarLogged from './NavBarLogged';
import NavBarUnlogged from './NavBarUnlogged';

function NavBar({ userLogout }) {
    const history = useHistory();
    const user = useSelector((state) => state.user);

    // function to handle the logout action
    const handleLogout = evt => {
        evt.preventDefault();
        userLogout();
        history.push(`/`);
    }

    return (
        <div className="NavBar">
            <Nav className="justify-content-center" activeKey="/">
                <Nav.Item>
                    <Nav.Link href="/">Quinielas</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/groups">Groups</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/matches">Matches</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/teams">Teams</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/rules">Rules</Nav.Link>
                </Nav.Item>

                <NavDropdown title={ user.isAuthenticated ? user.username : "Login/Register" } id="nav-dropdown">
                    { user.isAuthenticated 
                        ? <NavBarLogged logout={handleLogout} />
                        : <NavBarUnlogged />
                    }
                </NavDropdown>
            </Nav>
        </div>
    );
}

export default NavBar;