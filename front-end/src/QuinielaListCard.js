import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Row, Col } from 'react-bootstrap';

function QuinielaListCard({ quiniela, position }){
    
    return (
        <Link to={`/quinielas/${ quiniela.username }/${quiniela.quinielaID}`} key={quiniela.quinielaID}>
            <Card data-testid={`quiniela-${quiniela.quinielaID}`} className="Quiniela-card">
                <Card.Body>
                    <Row>
                        <Col xs lg="1" className="Quiniela-card-pos-number">
                            { position + 1 }
                        </Col>
                        <Col xs lg="2">
                            <Image fluid src={ `/images/team_logo/${quiniela.championTeam_ShortName}.png` } alt={ quiniela.championTeam_Name } className="Quiniela-card-logo-team" />
                        </Col>
                        <Col className="Quiniela-card-text">
                            <p><span>Username:</span> @{ quiniela.username }</p>
                        </Col>
                        <Col className="Quiniela-card-text">
                            <p><span>Name:</span> { `${quiniela.userFirstName} ${quiniela.userLastName}` }</p>
                        </Col>
                        <Col className="Quiniela-card-text">
                            <p><span>Champion Team:</span> { quiniela.championTeam_Name }</p>
                        </Col>
                        <Col xs lg="2" className="Quiniela-card-points">
                            <div className="Quiniela-card-points-number">{ quiniela.points }</div>
                            <div className="Quiniela-card-points-text">Points</div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default QuinielaListCard;