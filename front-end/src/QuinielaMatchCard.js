import React from "react";
import { Card, Image, Row, Col } from 'react-bootstrap';

function MatchCard({ match }){
    const teamAName = match.teamA_name;
    const teamALogo = <Image src={ `/images/team_logo/${match.teamA_shortName}.png` } alt={ match.teamA_name } fluid={true} />;
    const teamBName = match.teamB_name;
    const teamBLogo = <Image src={ `/images/team_logo/${match.teamB_shortName}.png` } alt={ match.teamB_name } fluid={true} />;
    const matchResult = `${match.teamA_result} - ${match.teamB_result}`;
            
    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col>Match { match.matchID }</Col>
                </Row>
                <Row>
                    <Col xs lg="2">{ teamALogo }</Col>
                    <Col>{ teamAName }</Col>
                    <Col>{ matchResult }</Col>
                    <Col>{ teamBName }</Col>
                    <Col xs lg="2">{ teamBLogo }</Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default MatchCard;