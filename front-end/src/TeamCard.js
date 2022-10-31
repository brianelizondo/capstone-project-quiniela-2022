import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';

function TeamCard({ team }){        
    return (
        <Link key={team.shortName} to={`/teams/${team.shortName}`}>
            <Card>
                <Card.Body>
                    <div><img src={ `https://media.api-sports.io/football/teams/${team.apiID}.png` } alt={ team.name } /></div>
                    <div>{ team.name }</div>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default TeamCard;