import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Row, Col } from 'react-bootstrap';

function MatchCard({ match }){
    let phase;
    let teamAName;
    let teamALogo = "";
    let teamBName;
    let teamBLogo = "";
    if(match.id <= 48){
        phase = 1;
        teamAName = match.teamA.name;
        teamALogo = <Image src={ `/images/team_logo/${match.teamA.shortName}.png` } alt={ match.teamA.name } fluid={true} />;
        teamBName = match.teamB.name;
        teamBLogo = <Image src={ `/images/team_logo/${match.teamB.shortName}.png` } alt={ match.teamB.name } fluid={true} />;
    }else{
        phase = 2;
        if(match.teamA.id > 0){
            teamAName = match.teamA.name;
            teamALogo = <Image src={ `/images/team_logo/${match.teamA.shortName}.png` } alt={ match.teamA.name } fluid={true} />;
        }else{
            teamAName = match.teamA_classified;
        }
        if(match.teamB.id > 0){
            teamBName = match.teamB.name;
            teamBLogo = <Image src={ `/images/team_logo/${match.teamB.shortName}.png` } alt={ match.teamA.name } fluid={true} />;
        }else{
            teamBName = match.teamB_classified;
        }
    }

    const matchResult = match.teamA_result !== null && match.teamB_result !== null ? `${match.teamA_result} - ${match.teamB_result}` : "vs";
        
    return (
        <Link key={match.id} to={`/matches/phase/${ phase }/match/${match.id}`}>
            <Card data-testid={`match-${match.id}`}>
                <Card.Body>
                    <Row>
                        <Col>Match { match.id }</Col>
                    </Row>
                    <Row>
                        <Col xs lg="2">{ teamALogo }</Col>
                        <Col>{ teamAName }</Col>
                        <Col>{ matchResult }</Col>
                        <Col>{ teamBName }</Col>
                        <Col xs lg="2">{ teamBLogo }</Col>
                    </Row>
                    <Row>
                        <Col>{ match.date }</Col>
                    </Row>
                    <Row>
                        <Col>{ match.time }</Col>
                    </Row>
                    <Row>
                        <Col>{ match.city } - { match.stadium }</Col>
                    </Row>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default MatchCard;