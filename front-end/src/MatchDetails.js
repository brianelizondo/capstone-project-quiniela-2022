import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Card, Image, Row, Col, ProgressBar } from 'react-bootstrap';
import Loading from './Loading';
import './MatchDetails.css';

// import APIFootball api
import APIFootball from "./api-football";

function MatchDetails(){
    const { matchID, phase } = useParams();
    const phaseID = Number(phase);
    // initial state
    const [loading, setLoading] = useState(false);
    const INITIAL_VALUE = { teamA: "", teamB: "" };
    const [matchDetails, setMatchDetails] = useState({});
    const [matchStats, setMatchStats] = useState([]);
    const [teamsName, setTeamsName] = useState(INITIAL_VALUE);
    const [teamsLogo, setTeamsLogo] = useState(INITIAL_VALUE);
    const [matchGoals, setMatchGoals] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function getMatchDetails() {
            const resp = await APIFootball.getMatchDetails(matchID, phase);
            setMatchDetails(resp);
            setMatchStats(Array.from(resp.apiStats));

            let teamAName, teamBName, teamALogo, teamBLogo; 
            if(phaseID === 1){
                teamAName = resp.teamA.name;
                teamBName = resp.teamB.name;
                teamALogo = <Image src={ `/images/team_logo/${resp.teamA.shortName}.png` } alt={ resp.teamA.name } fluid />;
                teamBLogo = <Image src={ `/images/team_logo/${resp.teamB.shortName}.png` } alt={ resp.teamB.name } fluid />;
            }else if(phaseID === 2){
                if(resp.teamA.id > 0){
                    teamAName = resp.teamA.name;
                    teamALogo = <Image src={ `/images/team_logo/${resp.teamA.shortName}.png` } alt={ resp.teamA.name } fluid />;
                }else{
                    teamAName = resp.teamA_classified;
                }
                if(resp.teamB.id > 0){
                    teamBName = resp.teamB.name;
                    teamBLogo = <Image src={ `/images/team_logo/${resp.teamB.shortName}.png` } alt={ resp.teamB.name } fluid />;
                }else{
                    teamBName = resp.teamB_classified;
                }
            }
            setTeamsName({ teamA: teamAName, teamB: teamBName });
            setTeamsLogo({ teamA: teamALogo, teamB: teamBLogo });

            if(resp.teamA_result >= 0 && resp.teamB_result >= 0){
                const goalsAPI = await APIFootball.getMatchGoals(matchID);
                setMatchGoals(goalsAPI);
            }
            
        }
        getMatchDetails();
        setLoading(false);
    }, [matchID, phase, phaseID]);

    const calculatePerc = (value, valueA, valueB) => {
        value = isNaN(value) ? Number(value.replace("%", "")) : value;
        valueA = isNaN(valueA) ? Number(valueA.replace("%", "")) : valueA;
        valueB = isNaN(valueB) ? Number(valueB.replace("%", "")) : valueB;
        return (value * 100) / (valueA + valueB);
    };

    let teamA_goals = "";
    let teamB_goals = "";
    if(matchGoals){
        if(matchGoals.teamA.length > 0){
            for(let goal of matchGoals.teamA){
                teamA_goals += `${goal.player} (${goal.time}')${ goal.type == "Penalty" ? " PK" : "" }\n`;
            }
        }
        if(matchGoals.teamB.length > 0){
            for(let goal of matchGoals.teamB){
                teamB_goals += `${goal.player} (${goal.time}')${ goal.type == "Penalty" ? " PK" : "" }\n`;
            }
        }
    }

    const matchResult = matchDetails.teamA_result !== null && matchDetails.teamB_result !== null ? `${matchDetails.teamA_result} - ${matchDetails.teamB_result}` : "vs";

    if(loading){
        return <Loading />;
    }

    return (
        <div className="MatchDetails col-md-8 offset-md-2">
            <Row>
                <Col>
                    <h1 className='section-title'>Match Details of FIFA World Cup 2022</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className='section-subtitle'>Details and Statistics about the match</h5>
                </Col>
            </Row>

            <Row>
                <Col className="MatchDetails-top-match">Match { matchDetails.id }</Col>
            </Row>
            <Row>
                <Col>
                    <div className="MatchDetails-top-teamA-name">{ teamsName.teamA }</div>
                    <div className="MatchDetails-top-teamA-goals">{ teamA_goals }</div>
                </Col>
                <Col xs lg="2" className="MatchDetails-top-teamA-logo">{ teamsLogo.teamA }
                </Col>
                <Col xs lg="3">
                    <div className="MatchDetails-top-result">{ matchResult }</div>
                    <div className="MatchDetails-top-text">{ matchDetails.date }</div>
                    <div className="MatchDetails-top-text">{ matchDetails.time }</div>
                    <div className="MatchDetails-top-text">{ matchDetails.city }</div>
                    <div className="MatchDetails-top-text">{ matchDetails.stadium }</div>
                </Col>
                <Col xs lg="2" className="MatchDetails-top-teamB-logo">{ teamsLogo.teamB }</Col>
                <Col>
                    <div className="MatchDetails-top-teamB-name">{ teamsName.teamB }</div>
                    <div className="MatchDetails-top-teamB-goals">{ teamB_goals }</div>
                </Col>
            </Row>

            <Row>
                <Col><h5 className='MatchDetails-subtitle'>Match Standings</h5></Col>
            </Row>
            <Row>
                <Col>
                    <Card className='MatchDetails-stats-card'>
                        <Card.Body>
                            { matchStats.map((stat, idx) => 
                            <div key={idx} className="MatchDetails-stats">
                                <Row>
                                    <Col xs lg={4} className="MatchDetails-stats-number-left">{ stat.teamA || 0 }</Col>
                                    <Col xs lg={4} className="MatchDetails-stats-type">{ stat.type }</Col>
                                    <Col xs lg={4} className="MatchDetails-stats-number-right">{ stat.teamB || 0 }</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <ProgressBar>
                                            <ProgressBar striped now={calculatePerc(stat.teamA, stat.teamA, stat.teamB)} key={1} />
                                            <ProgressBar striped variant="info" now={calculatePerc(stat.teamB, stat.teamA, stat.teamB)} key={2} />
                                        </ProgressBar>
                                    </Col>
                                </Row>
                            </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default MatchDetails;