import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Image, Row, Col } from 'react-bootstrap';
import './UserQuinielaListCard.css';

function UserQuinielaListCard({ quiniela, handleModalShow }){
    
    return (
        <Link to={`/quinielas/${ quiniela.username }/${quiniela.quinielaID}`} key={quiniela.quinielaID}>
            <Card className="UserQuinielaListCard-card">
                <Row>
                    <Col xs lg="2" className="UserQuinielaListCard-logo">
                        <Image fluid src={ `/images/team_logo/${quiniela.championTeam_ShortName}.png` } alt={ quiniela.championTeam_Name } />
                    </Col>
                    <Col className="UserQuinielaListCard-text">
                        <div>Username: @{ quiniela.username }</div>
                        <div>Name: { `${quiniela.userFirstName} ${quiniela.userLastName}` }</div>
                        <div>Champion Team: { quiniela.championTeam_Name }</div>
                    </Col>
                    <Col xs lg="2">
                        <div className="UserQuinielaListCard-points-number">{ quiniela.points }</div>
                        <div className="UserQuinielaListCard-points-text">Points</div>
                    </Col>
                    <Col xs lg="2" className="UserQuinielaListCard-points-button">
                        <Button variant="danger" onClick={() => handleModalShow(quiniela.quinielaID)}>Delete</Button>
                    </Col>
                </Row>
            </Card>
        </Link>
    );
}

export default UserQuinielaListCard;