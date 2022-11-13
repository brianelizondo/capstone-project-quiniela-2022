import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';

function MatchCard({ match }){
    let phase;
    let teamAName;
    let teamALogo = "";
    let teamBName;
    let teamBLogo = "";
    if(match.id <= 48){
        phase = 1;
        teamAName = match.teamA.name;
        teamALogo = <img src={ `/images/team_logo/${match.teamA.shortName}.png` } alt={ match.teamA.name } />;
        teamBName = match.teamB.name;
        teamBLogo = <img src={ `/images/team_logo/${match.teamB.shortName}.png` } alt={ match.teamB.name } />;
    }else{
        phase = 2;
        if(match.teamA.id > 0){
            teamAName = match.teamA.name;
            teamALogo = <img src={ `/images/team_logo/${match.teamA.shortName}.png` } alt={ match.teamA.name } />;
        }else{
            teamAName = match.teamA_classified;
        }
        if(match.teamB.id > 0){
            teamBName = match.teamB.name;
            teamBLogo = <img src={ `/images/team_logo/${match.teamB.shortName}.png` } alt={ match.teamA.name } />;
        }else{
            teamBName = match.teamB_classified;
        }
    }

    const matchResult = match.teamA_result >= 0 && match.teamB_result >= 0 ? `${match.teamA_result} - ${match.teamB_result}` : "vs";
        
    return (
        <Link key={match.id} to={`/matches/phase/${ phase }/match/${match.id}`}>
            <Card>
                <Card.Body>
                    <div>{ match.date }</div>
                    <div>{ teamALogo } { teamAName } { matchResult } { teamBName } { teamBLogo }</div>
                    <div>{ match.time }</div>
                    <div>{ match.city } - { match.stadium }</div>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default MatchCard;