import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';

// import APIFootball api
import APIFootball from "./api-football";


function MatchDetails(){
    const { matchID, phase } = useParams();
    const phaseID = Number(phase);
    
    const INITIAL_VALUE = { teamA: "", teamB: "" };
    const [matchDetails, setMatchDetails] = useState({});
    const [matchStats, setMatchStats] = useState([]);
    const [teamsName, setTeamsName] = useState(INITIAL_VALUE);
    const [teamsLogo, setTeamsLogo] = useState(INITIAL_VALUE);

    useEffect(() => {
        async function getMatchDetails() {
            const resp = await APIFootball.getMatchDetails(matchID, phase);
            setMatchDetails(resp);
            setMatchStats(Array.from(resp.apiStats));

            if(phaseID == 1){
                const teamALogo = <img src={ resp.teamA.apiInfo.logo } alt={ resp.teamA.name } />;
                const teamBLogo = <img src={ resp.teamB.apiInfo.logo } alt={ resp.teamB.name } />;
                setTeamsName({ teamA: resp.teamA.name, teamB: resp.teamB.name });
                setTeamsLogo({ teamA: teamALogo, teamB: teamBLogo });
            }else{
                let teamAName, teamBName, teamALogo = "", teamBLogo = "";
                if(resp.teamA.id > 0){
                    teamAName = resp.teamA.name;
                    teamALogo = <img src={ `https://media.api-sports.io/football/teams/${resp.teamA.apiID}.png` } alt={ resp.teamA.name } />;
                }else{
                    teamAName = resp.teamA_classified;
                }
                if(resp.teamB.id > 0){
                    teamBName = resp.teamB.name;
                    teamBLogo = <img src={ `https://media.api-sports.io/football/teams/${resp.teamB.apiID}.png` } alt={ resp.teamB.name } />;
                }else{
                    teamBName = resp.teamB_classified;
                }
                setTeamsName({ teamA: teamAName, teamB: teamBName });
                setTeamsLogo({ teamA: teamALogo, teamB: teamBLogo });
            }
        }
        getMatchDetails();
    }, []);

    const calculatePerc = (value, valueA, valueB) => {
        value = isNaN(value) ? Number(value.replace("%", "")) : value;
        valueA = isNaN(valueA) ? Number(valueA.replace("%", "")) : valueA;
        valueB = isNaN(valueB) ? Number(valueB.replace("%", "")) : valueB;
        return (value * 100) / (valueA + valueB);
    };

    return (
        <div className="MatchDetails col-md-8 offset-md-2">
            <h1>Match Details of FIFA World Cup 2022</h1>
            <p>Details and Statistics about the match</p>

            <div className="MatchDetails-title">
                <div>{ matchDetails.date }</div>
                <div>{ teamsLogo.teamA } { teamsName.teamA } vs { teamsName.teamB } { teamsLogo.teamB }</div>
                <div>{ matchDetails.time }</div>
                <div>{ matchDetails.city } - { matchDetails.stadium }</div>
            </div>

            <h4>Match Stats</h4>
            <div className="MatchDetails-stats">
                { matchStats.map((stat, idx) => 
                    <div key={idx}>
                        <div>{ stat.type }</div>
                        <div>{ stat.teamA }</div>
                        <ProgressBar>
                            <ProgressBar striped now={calculatePerc(stat.teamA, stat.teamA, stat.teamB)} key={1} />
                            <ProgressBar striped variant="info" now={calculatePerc(stat.teamB, stat.teamA, stat.teamB)} key={2} />
                        </ProgressBar>
                        <div>{ stat.teamB }</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MatchDetails;