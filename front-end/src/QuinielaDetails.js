import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import Loading from './Loading';

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
        <div className="MatchList col-md-8 offset-md-2">
            <h1>@{ user.username.toUpperCase() }</h1>
            <p>List of Group Matches, Round of 16, Quarter-Finals, Semi-Finals, 3th Place & Final</p>

            <div>
                <h3>{ quinielaChampion.championTeam_Name }</h3>
                <p>Champion team of this Quiniela</p>
                <img src={ `/images/team_logo/${quinielaChampion.championTeam_ShortName}.png` } alt={ quinielaChampion.championTeam_Name } />
            </div>
            
            <Tabs defaultActiveKey="groups" id="justify-tab" className="mb-3" justify>
                <Tab eventKey="groups" title="Group Matches">
                    { matchesGroups.map(match => <QuinielaMatchCard key={match.matchID} match={match} />) }
                </Tab>
                <Tab eventKey="round16" title="Round of 16">
                    { matchesRound16.map(match => <QuinielaMatchCard key={match.matchID} match={match} />) }
                </Tab>
                <Tab eventKey="quarters" title="Quarter-Finals">
                    { matchesQuarters.map(match => <QuinielaMatchCard key={match.matchID} match={match} />) }
                </Tab>
                <Tab eventKey="semis" title="Semi-Finals">
                    { matchesSemis.map(match => <QuinielaMatchCard key={match.matchID} match={match} />) }
                </Tab>
                <Tab eventKey="3thplace" title="3th Place">
                    { matches3thPlace.map(match => <QuinielaMatchCard key={match.matchID} match={match} />) }
                </Tab>
                <Tab eventKey="final" title="Final">
                    { matchesFinal.map(match => <QuinielaMatchCard key={match.matchID} match={match} />) }
                </Tab>
            </Tabs>
        </div>
    );
}

export default QuinielaDetails;