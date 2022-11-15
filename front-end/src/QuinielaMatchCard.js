import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';

function MatchCard({ match }){
    const phase = match.match_phase ? 2 : 1;
    const teamAName = match.teamA_name;
    const teamALogo = <img src={ `/images/team_logo/${match.teamA_shortName}.png` } alt={ match.teamA_name } />;
    const teamBName = match.teamB_name;
    const teamBLogo = <img src={ `/images/team_logo/${match.teamB_shortName}.png` } alt={ match.teamB_name } />;
    const matchResult = `${match.teamA_result} - ${match.teamB_result}`;
            
    return (
        <Card>
            <Card.Body>
                <div>Match { match.matchID }</div>
                <div>{ teamALogo } { teamAName } { matchResult } { teamBName } { teamBLogo }</div>
            </Card.Body>
        </Card>
    );
}

export default MatchCard;