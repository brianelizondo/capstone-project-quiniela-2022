import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Loading from './Loading';

// import APIFootball api
import APIFootball from "./api-football";

import MatchCard from './MatchCard';

function MatchList(){
    // initial state
    const [loading, setLoading] = useState(false);
    const [matchesGroups, setMatchesGroups] = useState([]);
    const [matchesRound16, setMatchesRound16] = useState([]);
    const [matchesQuarters, setMatchesQuarters] = useState([]);
    const [matchesSemis, setMatchesSemis] = useState([]);
    const [matches3thPlace, setMatches3thPlace] = useState([]);
    const [matchesFinal, setMatchesFinal] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function getPhaseMatches(){
            const respPhase1 = await APIFootball.getPhaseMatches(1);
            setMatchesGroups(respPhase1);

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
        }
        getPhaseMatches();
        setLoading(false);
    }, []);

    if(loading){
        return <Loading />;
    }

    return (
        <div className="MatchList col-md-8 offset-md-2">
            <h1>Matches in FIFA World Cup 2022</h1>
            <p>List of Group Matches, Round of 16, Quarter-Finals, Semi-Finals, 3th Place & Final</p>
            
            <Tabs defaultActiveKey="groups" id="justify-tab" className="mb-3" justify>
                <Tab eventKey="groups" title="Group Matches">
                    { matchesGroups.map(match => <MatchCard key={match.id} match={match} />) }
                </Tab>
                <Tab eventKey="round16" title="Round of 16">
                    { matchesRound16.map(match => <MatchCard key={match.id} match={match} />) }
                </Tab>
                <Tab eventKey="quarters" title="Quarter-Finals">
                    { matchesQuarters.map(match => <MatchCard key={match.id} match={match} />) }
                </Tab>
                <Tab eventKey="semis" title="Semi-Finals">
                    { matchesSemis.map(match => <MatchCard key={match.id} match={match} />) }
                </Tab>
                <Tab eventKey="3thplace" title="3th Place">
                    { matches3thPlace.map(match => <MatchCard key={match.id} match={match} />) }
                </Tab>
                <Tab eventKey="final" title="Final">
                    { matchesFinal.map(match => <MatchCard key={match.id} match={match} />) }
                </Tab>
            </Tabs>
        </div>
    );
}

export default MatchList;