import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import { Nav, NavDropdown, Row, Col, Image } from 'react-bootstrap';
import './NavBar.css';
import QuinielaLogo from './images/quinielas-logo.png';

import NavBarLogged from './NavBarLogged';
import NavBarUnlogged from './NavBarUnlogged';

function NavBar({ userLogout }) {
    const history = useHistory();
    const location = useLocation();
    const user = useSelector((state) => state.user);

    // function to handle the logout action
    const handleLogout = evt => {
        evt.preventDefault();
        userLogout();
        history.push(`/`);
    }

    return (
        <div className="NavBar">
            <Row className="col-md-8 offset-md-2">
                <Col className='NavBar-logo'>
                    <Image src={QuinielaLogo} alt='Quinielas World Cup 2022' fluid />
                </Col>
            </Row>
            <Row className="col-md-8 offset-md-2">
                <Col>
                    <Nav justify className="NavBar-menu justify-content-center" activeKey={location.pathname}>
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
                </Col>
            </Row>
        </div>
    );
}

export default NavBar;