import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Row, Col } from 'react-bootstrap';
import './TeamCard.css';

function TeamCard({ team }){        
    return (
        <Link key={team.shortName} to={`/teams/${team.shortName}`}>
            <Card data-testid={`team-${team.shortName}`} className="TeamCard-card">
                <Card.Body>
                    <Row>
                        <Col xs lg="2"><Image src={ `/images/team_logo/${team.shortName}.png` } alt={ team.name } className="TeamCard-teamlogo" /></Col>
                    </Row>
                    <Row>
                        <Col xs lg="2" className="TeamCard-teamname">{ team.name }</Col>
                    </Row>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default TeamCard;