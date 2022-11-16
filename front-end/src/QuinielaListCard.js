import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Row, Col } from 'react-bootstrap';

function QuinielaListCard({ quiniela, position }){
    
    return (
        <Link to={`/quinielas/${ quiniela.username }/${quiniela.quinielaID}`} key={quiniela.quinielaID}>
            <Card>
                <Card.Body>
                    <Row>
                        <Col xs lg="1">
                            <div>{ position + 1 }</div>
                            <div>Position</div>
                        </Col>
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
                    </Row>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default QuinielaListCard;