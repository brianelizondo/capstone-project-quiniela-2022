import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Row, Col } from 'react-bootstrap';
import './MatchCard.css';

function MatchCard({ match,  matchesGoals }){
    let phase;
    let matchGroup = null;
    let teamAName;
    let teamALogo = null;
    let teamBName;
    let teamBLogo = null;
    if(match.id <= 48){
        phase = 1;
        matchGroup = match.group;
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

    let teamA_goals = "";
    let teamB_goals = "";
    if(matchesGoals[`match-${match.id}`]){
        const match_goals = matchesGoals[`match-${match.id}`];

        if(match_goals.teamA.length > 0){
            for(let goal of match_goals.teamA){
                teamA_goals += `${ goal.type == "Penalty" ? "PK " : "" }(${goal.time}') ${goal.player}\n`;
            }
        }
        if(match_goals.teamB.length > 0){
            for(let goal of match_goals.teamB){
                teamB_goals += `${goal.player} (${goal.time}')${ goal.type == "Penalty" ? " PK" : "" }\n`;
            }
        }
    }

    const matchResult = match.teamA_result !== null && match.teamB_result !== null ? `${match.teamA_result} - ${match.teamB_result}` : "vs";
        
    return (
        <Link to={`/matches/phase/${ phase }/match/${match.id}`}>
            <Card data-testid={`match-${match.id}`} className="MatchCard-card">
                <Card.Body>
                    <Row>
                        <Col className="MatchCard-match">Match { match.id }</Col>
                    </Row>
                    { matchGroup !== null ? 
                    <Row>
                        <Col className="MatchCard-group">Group { matchGroup }</Col>
                    </Row>
                    : null }
                    <Row>
                        { teamALogo !== null ? <Col xs lg="2" className="MatchCard-teamlogo">{ teamALogo }</Col> : null }
                        <Col>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col className="MatchCard-teamnameA">{ teamAName }</Col>
                                    </Row>
                                    { teamA_goals !== "" ? 
                                    <Row>
                                        <Col className="MatchCard-teamgoalsA">{ teamA_goals }</Col>
                                    </Row>
                                    : null }
                                </Col>
                                <Col className="MatchCard-result">{ matchResult }</Col>
                                <Col>
                                <Row>
                                        <Col className="MatchCard-teamnameB">{ teamBName }</Col>
                                    </Row>
                                    { teamB_goals !== "" ? 
                                    <Row>
                                        <Col className="MatchCard-teamgoalsB">{ teamB_goals }</Col>
                                    </Row>
                                    : null }
                                </Col>
                            </Row>
                            <Row>
                                <Col className="MatchCard-date">{ match.date }</Col>
                            </Row>
                            <Row>
                                <Col className="MatchCard-time">{ match.time }</Col>
                            </Row>
                            <Row>
                                <Col className="MatchCard-location">{ match.city }</Col>
                            </Row>
                            <Row>
                                <Col className="MatchCard-location">{ match.stadium }</Col>
                            </Row>
                        </Col>             
                        { teamBLogo !== null ? <Col xs lg="2" className="MatchCard-teamlogo">{ teamBLogo }</Col> : null }
                    </Row>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default MatchCard;