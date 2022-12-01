import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import './QuinielaMatchCard.css';

// card for the match in the quiniela
function MatchCard({ match, points }){
    const teamAName = match.teamA_name;
    const teamALogo = <Image src={ `/images/team_logo/${match.teamA_shortName}.png` } alt={ match.teamA_name } fluid={true} />;
    const teamBName = match.teamB_name;
    const teamBLogo = <Image src={ `/images/team_logo/${match.teamB_shortName}.png` } alt={ match.teamB_name } fluid={true} />;
    const matchResult = `${match.teamA_result} - ${match.teamB_result}`;
            
    return (
        <Card className="QuinielaMatchCard-card">
            <Card.Body>
                <Row>
                    <Col className="QuinielaMatchCard-match">Match { match.matchID }</Col>
                </Row>
                <Row>
                    <Col xs lg="2" className="QuinielaMatchCard-teamlogo">{ teamALogo }</Col>
                    <Col className="QuinielaMatchCard-teamnameA">{ teamAName }</Col>
                    <Col className="QuinielaMatchCard-result">{ matchResult }</Col>
                    <Col className="QuinielaMatchCard-teamnameB">{ teamBName }</Col>
                    <Col xs lg="2" className="QuinielaMatchCard-teamlogo">{ teamBLogo }</Col>
                </Row>
                <Row>
                    <Col className="QuinielaMatchCard-points">{ points }</Col>
                </Row>
                <Row>
                    <Col className="QuinielaMatchCard-points-text">points earned</Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default MatchCard;