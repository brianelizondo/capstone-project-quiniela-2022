import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Table, Button } from 'react-bootstrap';
import './GroupStandings.css';

function GroupStandings({ group, standings, detailsButton }){
    let history = useHistory();
    function handleClick(link){
        history.push(link);
    }
    
    return (
        <Card className="GroupStandings-card">
            <Card.Body>
                <Card.Title className="GroupStandings-card-title">Group { group }</Card.Title>
                <Table striped size="sm" className="GroupStandings-card-table">
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
                        <tr key={idx} onClick={() => handleClick(`/teams/${team.shortName}`)} data-testid={ `team-${team.shortName}` } className="GroupStandings-card-team">
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
                
                { detailsButton ? 
                    <Card.Text className="text-end">
                        <Button id={ `group${ group.toUpperCase() }_button` } variant="info" size="sm" onClick={() => handleClick(`/groups/${group}`)}>Group { group } Details</Button> 
                    </Card.Text>                    
                : "" }                
            </Card.Body>
        </Card>
    );
}

export default GroupStandings;