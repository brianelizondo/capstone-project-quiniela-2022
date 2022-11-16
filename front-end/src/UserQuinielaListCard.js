import React from "react";
import { Card, Button, Image, Row, Col } from 'react-bootstrap';

function UserQuinielaListCard({ quiniela, handleModalShow }){
    
    return (
        <Card>
            <Row>
                <Col xs lg="2">
                    <Image src={ `/images/team_logo/${quiniela.championTeam_ShortName}.png` } alt={ quiniela.championTeam_Name } fluid={true} />
                </Col>
                <Col>
                    <div>Username: @{ quiniela.username }</div>
                    <div>Name: { `${quiniela.userFirstName} ${quiniela.userLastName}` }</div>
                    <div>Champion Team: { quiniela.championTeam_Name }</div>
                </Col>
                <Col xs lg="2">
                    <div>Points</div>
                    <div>{ quiniela.points }</div>
                </Col>
                <Col xs lg="2">
                    <Button variant="danger" onClick={() => handleModalShow(quiniela.quinielaID)}>Delete</Button>
                </Col>
            </Row>
        </Card>
    );
}

export default UserQuinielaListCard;