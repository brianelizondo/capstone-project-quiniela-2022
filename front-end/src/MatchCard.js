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
        teamALogo = <img src={ match.teamA.apiInfo.logo } alt={ match.teamA.name } />;
        teamBName = match.teamB.name;
        teamBLogo = <img src={ match.teamB.apiInfo.logo } alt={ match.teamB.name } />;
    }else{
        phase = 2;
        if(match.teamA.id > 0){
            teamAName = match.teamA.name;
            teamALogo = <img src={ `https://media.api-sports.io/football/teams/${match.teamA.apiID}.png` } alt={ match.teamA.name } />;
        }else{
            teamAName = match.teamA_classified;
        }
        if(match.teamB.id > 0){
            teamBName = match.teamB.name;
            teamBLogo = <img src={ `https://media.api-sports.io/football/teams/${match.teamB.apiID}.png` } alt={ match.teamA.name } />;
        }else{
            teamBName = match.teamB_classified;
        }
    }
        
    return (
        <Link key={match.id} to={`/matches/phase/${ phase }/match/${match.id}`}>
            <Card>
                <Card.Body>
                    <div>{ match.date }</div>
                    <div>{ teamALogo } { teamAName } vs { teamBName } { teamBLogo }</div>
                    <div>{ match.time }</div>
                    <div>{ match.city } - { match.stadium }</div>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default MatchCard;