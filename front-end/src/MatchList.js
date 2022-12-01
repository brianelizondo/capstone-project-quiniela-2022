import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Row, Col } from 'react-bootstrap';
import Loading from './Loading';
import './MatchList.css';

// import APIFootball api
import APIFootball from './api-football';
// import additionals components
import MatchCard from './MatchCard';

function MatchList(){
    // initial state
    const [loading, setLoading] = useState(true);
    const [matchesGroups, setMatchesGroups] = useState([]);
    const [matchesRound16, setMatchesRound16] = useState([]);
    const [matchesQuarters, setMatchesQuarters] = useState([]);
    const [matchesSemis, setMatchesSemis] = useState([]);
    const [matches3thPlace, setMatches3thPlace] = useState([]);
    const [matchesFinal, setMatchesFinal] = useState([]);
    const [matchesGoals, setMatchesGoals] = useState({});

    useEffect(() => {
        async function getPhaseMatches(){
            // get the phase 1 matches
            const respPhase1 = await APIFootball.getPhaseMatches(1);
            setMatchesGroups(respPhase1);

            // get the phase 2 matches and set to each phase
            const respPhase2 = await APIFootball.getPhaseMatches(2);
            respPhase2.forEach(match => {
                switch (match.phase){
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

            // get the goals info from the APi
            setMatchesGoals(await APIFootball.getMatchesGoals());
        }
        getPhaseMatches();
        setLoading(false);
    }, []);

    if(loading){
        return <Loading />;
    }

    return (
        <div className="MatchList col-md-8 offset-md-2">
            <Row>
                <Col>
                    <h1 className='section-title'>Matches in FIFA World Cup 2022</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className='section-subtitle'>List of Group Matches, Round of 16, Quarter-Finals, Semi-Finals, 3th Place & Final</h5>
                </Col>
            </Row>
            <Row>
                <Col className="MatchList-tabs">
                    <Tabs defaultActiveKey="groups" id="justify-tab" className="mb-3" justify>
                        <Tab eventKey="groups" title="Group Matches">
                            <div className="MatchList-tabs-title">Group Matches</div>
                            { matchesGroups.map(match => <MatchCard key={match.id} match={match} matchesGoals={matchesGoals} />) }
                        </Tab>
                        <Tab eventKey="round16" title="Round of 16">
                            <div className="MatchList-tabs-title">Round of 16</div>
                            { matchesRound16.map(match => <MatchCard key={match.id} match={match} matchesGoals={matchesGoals} />) }
                        </Tab>
                        <Tab eventKey="quarters" title="Quarter-Finals">
                            <div className="MatchList-tabs-title">Quarter-Finals</div>
                            { matchesQuarters.map(match => <MatchCard key={match.id} match={match} matchesGoals={matchesGoals} />) }
                        </Tab>
                        <Tab eventKey="semis" title="Semi-Finals">
                            <div className="MatchList-tabs-title">Semi-Finals</div>
                            { matchesSemis.map(match => <MatchCard key={match.id} match={match} matchesGoals={matchesGoals} />) }
                        </Tab>
                        <Tab eventKey="3thplace" title="3th Place">
                            <div className="MatchList-tabs-title">3th Place</div>
                            { matches3thPlace.map(match => <MatchCard key={match.id} match={match} matchesGoals={matchesGoals} />) }
                        </Tab>
                        <Tab eventKey="final" title="Final">
                            <div className="MatchList-tabs-title">Final</div>
                            { matchesFinal.map(match => <MatchCard key={match.id} match={match} matchesGoals={matchesGoals} />) }
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </div>
    );
}

export default MatchList;