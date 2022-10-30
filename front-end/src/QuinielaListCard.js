import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';

function QuinielaListCard({ quiniela, position }){
    const quinielaChampionTeam = <div>Champion team: { quiniela.championTeamName } </div>;
    return (
        <Link to={`/quinielas/${ quiniela.username }/${quiniela.quinielaID}`} key={quiniela.quinielaID}>
            <Card>
                <Card.Body>
                    <div>Position: { position + 1 }</div>
                    <div>Username / Name: { quiniela.username } - { quiniela.userFirstName }</div>
                    <div>Points: { quiniela.points }</div>
                    { quiniela.championTeamName ? quinielaChampionTeam : "" }
                </Card.Body>
            </Card>
        </Link>
    );
}

export default QuinielaListCard;