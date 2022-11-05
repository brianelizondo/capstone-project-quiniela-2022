import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, ProgressBar, Image } from 'react-bootstrap';
import Loading from './Loading';

// import APIFootball api
import APIFootball from "./api-football";

function TeamDetails(){
    const { shortname } = useParams();
    // initial state
    const [loading, setLoading] = useState(false);
    const [team, setTeam] = useState({});
    const [teamStats, setTeamStats] = useState([]);
    const [teamSquad, setTeamSquads] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function getTeam(){
            const resp = await APIFootball.getTeam(shortname);
            const respStats = await APIFootball.getTeamStats(shortname);
            const respSquad = await APIFootball.getTeamSquad(shortname);
            setTeam(resp);
            setTeamStats(respStats);
            setTeamSquads(respSquad);
        }
        getTeam();
        setLoading(false);
    }, [shortname]);

    const calculatePorc = (value, total) => {
        return ((value * 100) / total).toFixed(2);
    }

    if(loading){
        return <Loading />;
    }

    return (
        <div className="TeamDetails col-md-8 offset-md-2">
            <h1>Team in FIFA World Cup 2022</h1>
            <p>Details for the team "{team.name}"</p>
            
            <div className="TeamDetails-title">
                <div>{ team.apiInfo ? <img src={ team.apiInfo.logo } alt={ team.name } /> : "" }</div>
                <div>{ team.name }</div>
            </div>

            <div className="TeamDetails-standings">
                { teamStats.map( stats => 
                <Card key={ team.shortName }>
                    <Card.Title>Team Standings</Card.Title>
                    <Card.Body>
                        <div>
                            <div>{ stats.matches.played } matches played</div>    
                            <div>{ stats.matches.won } won</div>
                            <div>{ stats.matches.drawn } drawn</div>
                            <div>{ stats.matches.lost } lost</div>
                            <div>
                                <ProgressBar>
                                    <ProgressBar striped now={ calculatePorc(stats.matches.won, stats.matches.played) } key={1} />
                                    <ProgressBar striped variant="warning" now={ calculatePorc(stats.matches.drawn, stats.matches.played) } key={2} />
                                    <ProgressBar striped variant="danger" now={ calculatePorc(stats.matches.lost, stats.matches.played) } key={3} />
                                </ProgressBar>
                            </div>
                        </div>
                        <div>
                            <div>{ stats.goals.for }</div>    
                            <div>Goals</div>
                            <div>{ stats.goals.forAvg } avg. per match</div>
                        </div>
                        <div>
                            <div>{ stats.goals.against }</div>    
                            <div>Goals conceded</div>
                            <div>{ stats.goals.againstAvg } avg. per match</div>
                        </div>
                        <div>
                            <div>{ stats.cleanSheet.total }</div>    
                            <div>clean sheet</div>
                            <div>{ stats.cleanSheet.avg } avg. per match</div>
                        </div>
                        <div>
                            <div>{ stats.cards.yellow }</div>    
                            <div>yellow cards</div>
                            <div>{ stats.cards.yellowCAg } avg. per match</div>
                        </div>
                        <div>
                            <div>{ stats.cards.red }</div>    
                            <div>red cards</div>
                            <div>{ stats.cards.redCAg } avg. per match</div>
                        </div>
                    </Card.Body>
                </Card>
                )}
            </div>

            <div className="TeamDetails-squad">
                <Card>
                <Card.Title>Team Squad</Card.Title>
                    <Card.Body>
                        { teamSquad.map((player, idx) => 
                        <div key={idx}>
                            <div><Image src={ `https://media.api-sports.io/football/players/${player.id}.png` } alt={ player.name } roundedCircle fluid /></div>    
                            <div>{ player.name }</div>
                            <div>{ player.position }</div>
                        </div>
                        )}
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default TeamDetails;