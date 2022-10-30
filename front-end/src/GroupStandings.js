import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Table, Button } from 'react-bootstrap';

function GroupStandings({ group, standings }){
    let history = useHistory();
    function handleClick(link){
        history.push(link);
    }
    
    return (
        <Card>
            <Card.Body>
                <Card.Title>Group { group }</Card.Title>
                <Table striped size="sm">
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>Played</th>
                            <th>Won</th>
                            <th>Draws</th>
                            <th>Lost</th>
                            <th>For</th>
                            <th>Against</th>
                            <th>Goal Diff</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        { standings.map((team, idx) => (
                        <tr key={idx} onClick={() => handleClick(`/teams/${team.shortName}`)}>
                            <td>{ team.teamName }</td>
                            <td>{ team.gamesPlayed }</td>
                            <td>{ team.gamesWon }</td>
                            <td>{ team.gamesDraws }</td>
                            <td>{ team.gamesLost }</td>
                            <td>{ team.goalsFor }</td>
                            <td>{ team.goalsAgainst }</td>
                            <td>{ team.goalsDiff }</td>
                            <td>{ team.points }</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
                <Button variant="info" size="sm" onClick={() => handleClick(`/groups/${group}`)}>Group Details</Button>
            </Card.Body>
        </Card>
    );
}

export default GroupStandings;