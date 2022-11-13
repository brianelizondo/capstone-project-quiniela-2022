import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';

function UserQuinielaListCard({ quiniela, user }){
    const quinielaChampionTeam = <div>Champion team: { quiniela.championTeamName } </div>;
    return (
        <Link to={`/quinielas/${ user.username }/${quiniela.id}`} key={quiniela.id}>
            <Card>
                <Card.Body>
                    <div>Username / Name: { quiniela.username } - { quiniela.userFirstName }</div>
                    <div>Points: { quiniela.points }</div>
                    { quiniela.championTeamName ? quinielaChampionTeam : "" }
                </Card.Body>
            </Card>
        </Link>
    );
}

export default UserQuinielaListCard;