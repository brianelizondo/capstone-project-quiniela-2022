import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';

function MatchCard({ match }){
    // set phase match
    const phase = match.id <= 56 ? 1 : 2;
    
    return (
        <Link key={match.id} to={`/matches/phase/${ phase }/match/${match.id}`}>
            <Card>
                <Card.Body>
                    <div>{ match.date }</div>
                    <div>{ match.teamA.name } vs { match.teamB.name }</div>
                    <div>{ match.time }</div>
                    <div>{ match.city } - { match.stadium }</div>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default MatchCard;