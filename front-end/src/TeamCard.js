import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Row, Col } from 'react-bootstrap';

function TeamCard({ team }){        
    return (
        <Link key={team.shortName} to={`/teams/${team.shortName}`}>
            <Card>
                <Card.Body>
                    <Row>
                        <Col xs lg="2"><Image src={ `/images/team_logo/${team.shortName}.png` } alt={ team.name } fluid={true} /></Col>
                        <Col>{ team.name }</Col>
                    </Row>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default TeamCard;