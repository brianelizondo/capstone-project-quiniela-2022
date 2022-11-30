import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Tab, Tabs, Row, Col, Image } from 'react-bootstrap';
import Loading from './Loading';
import './QuinielaDetails.css';

// import APIFootball api
import APIFootball from "./api-football";

import QuinielaMatchCard from './QuinielaMatchCard';

function QuinielaDetails(){
    // initial state
    const user = useSelector((state) => state.user);
    const { username, quinielaID } = useParams();
    const [loading, setLoading] = useState(false);
    const [quinielaChampion, setQuinielaChampion] = useState({});
    const [matchesGroups, setMatchesGroups] = useState([]);
    const [matchesRound16, setMatchesRound16] = useState([]);
    const [matchesQuarters, setMatchesQuarters] = useState([]);
    const [matchesSemis, setMatchesSemis] = useState([]);
    const [matches3thPlace, setMatches3thPlace] = useState([]);
    const [matchesFinal, setMatchesFinal] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function getPhaseMatches(){
            APIFootball.token = user.token;
            const respQuiniela = await APIFootball.getQuinielaDetails(username, quinielaID);
            setQuinielaChampion({
                quiniela_points: respQuiniela.points,
                championTeam_ID: respQuiniela.championTeam_ID, 
                championTeam_Name: respQuiniela.championTeam_Name, 
                championTeam_ShortName: respQuiniela.championTeam_ShortName 
            });
            setMatchesGroups(respQuiniela.matchesPhase1);

            respQuiniela.matchesPhase2.forEach(match => {
                switch (match.matchPhase){
                    case 'R16':
                        setMatchesRound16(matches => [...matches, match]);
                        break;
                    case 'QF':
                        setMatchesQuarters(matches => [...matches, match]);
                        break;
                    case 'SF':
                        setMatchesSemis(matches => [...matches, match]);
                        break;
                    case '3P':
                        setMatches3thPlace(matches => [...matches, match]);
                        break;
                    case 'F':
                        setMatchesFinal(matches => [...matches, match]);
                        break;
                    default:
                        break;
                }
            });
        }
        getPhaseMatches();
        setLoading(false);
    }, []);

    if(loading){
        return <Loading />;
    }

    return (
        <div className="QuinielaDetails col-md-8 offset-md-2">
            <Row>
                <Col>
                    <h1 className='section-title'>@{ user.username.toUpperCase() }</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className='section-subtitle'>Total Points Earned: <b>{ quinielaChampion.quiniela_points } pts</b></h5>
                </Col>
            </Row>
            <Row>
                <Col xs lg={6} className="QuinielaDetails-teamlogo">
                    <Image fluid src={ `/images/team_logo/${quinielaChampion.championTeam_ShortName}.png` } alt={ quinielaChampion.championTeam_Name } />
                </Col>
                <Col>
                    <div className="QuinielaDetails-teamname">{ quinielaChampion.championTeam_Name }</div>
                    <div className="QuinielaDetails-text">Champion team of this Quiniela</div>
                </Col>
            </Row>
            <Row>
                <Col className="QuinielaDetails-tabs">
                    <Tabs defaultActiveKey="groups" id="justify-tab" className="mb-3" justify>
                        <Tab eventKey="groups" title="Group Matches">
                            <div className="QuinielaDetails-tabs-title">Group Matches</div>
                            { matchesGroups.map(match => <QuinielaMatchCard key={match.matchID} match={match} points={match.points} />) }
                        </Tab>
                        <Tab eventKey="round16" title="Round of 16">
                            <div className="QuinielaDetails-tabs-title">Round of 16</div>
                            { matchesRound16.map(match => <QuinielaMatchCard key={match.matchID} match={match} points={match.points} />) }
                        </Tab>
                        <Tab eventKey="quarters" title="Quarter-Finals">
                            <div className="QuinielaDetails-tabs-title">Quarter-Finals</div>
                            { matchesQuarters.map(match => <QuinielaMatchCard key={match.matchID} match={match} points={match.points} />) }
                        </Tab>
                        <Tab eventKey="semis" title="Semi-Finals">
                            <div className="QuinielaDetails-tabs-title">Semi-Finals</div>
                            { matchesSemis.map(match => <QuinielaMatchCard key={match.matchID} match={match} points={match.points} />) }
                        </Tab>
                        <Tab eventKey="3thplace" title="3th Place">
                            <div className="QuinielaDetails-tabs-title">3th Place</div>
                            { matches3thPlace.map(match => <QuinielaMatchCard key={match.matchID} match={match} points={match.points} />) }
                        </Tab>
                        <Tab eventKey="final" title="Final">
                            <div className="QuinielaDetails-tabs-title">Final</div>
                            { matchesFinal.map(match => <QuinielaMatchCard key={match.matchID} match={match} points={match.points} />) }
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </div>
    );
}

export default QuinielaDetails;