import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import './NavBar.css';

import NavBarLogged from './NavBarLogged';
import NavBarUnlogged from './NavBarUnlogged';

function NavBar() {
    // test user
    const user = false;

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

                <NavDropdown title="Login/Register" id="nav-dropdown">
                    { user 
                        ? <NavBarLogged />
                        : <NavBarUnlogged />
                    }
                </NavDropdown>
            </Nav>
        </div>
    );
}

export default NavBar;