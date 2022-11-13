import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import Loading from './Loading';

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

    useEffect(() => {
        setLoading(true);
        async function getMatchDetails() {
            const resp = await APIFootball.getMatchDetails(matchID, phase);
            setMatchDetails(resp);
            setMatchStats(Array.from(resp.apiStats));

            if(phaseID === 1){
                const teamALogo = <img src={ `/images/team_logo/${resp.teamA.shortName}.png` } alt={ resp.teamA.name } />;
                const teamBLogo = <img src={ `/images/team_logo/${resp.teamB.shortName}.png` } alt={ resp.teamB.name } />;
                setTeamsName({ teamA: resp.teamA.name, teamB: resp.teamB.name });
                setTeamsLogo({ teamA: teamALogo, teamB: teamBLogo });
            }else if(phaseID === 2){
                let teamAName, teamBName, teamALogo = "", teamBLogo = "";
                if(resp.teamA.id > 0){
                    teamAName = resp.teamA.name;
                    teamALogo = <img src={ `/images/team_logo/${resp.teamA.shortName}.png` } alt={ resp.teamA.name } />;
                }else{
                    teamAName = resp.teamA_classified;
                }
                if(resp.teamB.id > 0){
                    teamBName = resp.teamB.name;
                    teamBLogo = <img src={ `/images/team_logo/${resp.teamB.shortName}.png` } alt={ resp.teamB.name } />;
                }else{
                    teamBName = resp.teamB_classified;
                }
                setTeamsName({ teamA: teamAName, teamB: teamBName });
                setTeamsLogo({ teamA: teamALogo, teamB: teamBLogo });
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

    const matchResult = matchDetails.teamA_result >= 0 && matchDetails.teamB_result >= 0 ? `${matchDetails.teamA_result} - ${matchDetails.teamB_result}` : "vs";

    if(loading){
        return <Loading />;
    }

    return (
        <div className="MatchDetails col-md-8 offset-md-2">
            <h1>Match Details of FIFA World Cup 2022</h1>
            <p>Details and Statistics about the match</p>

            <div className="MatchDetails-title">
                <div>{ matchDetails.date }</div>
                <div>{ teamsLogo.teamA } { teamsName.teamA } { matchResult } { teamsName.teamB } { teamsLogo.teamB }</div>
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