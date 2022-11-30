import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, ProgressBar, Image, Row, Col } from 'react-bootstrap';
import Loading from './Loading';
import './TeamDetails.css';

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
            <Row>
                <Col>
                    <h1 className='section-title'>Team in FIFA World Cup 2022</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className='section-subtitle'>Details for the team "{team.name}"</h5>
                </Col>
            </Row>
            <Row>
                <Col xs lg={6} className="TeamDetails-logo">
                    <Image fluid src={ `/images/team_logo/${team.shortName}.png` } alt={ team.name } />
                </Col>
                <Col className="TeamDetails-name">{ team.name }</Col>
            </Row>

            <Row>
                <Col><h5 className='TeamDetails-subtitle'>Team Standings</h5></Col>
            </Row>
            <Row className="TeamDetails-standings">
                { teamStats.map( stats => 
                <Card key={ team.shortName } className="TeamDetails-card">
                    <Card.Body>
                        <Row>
                            <Col xs lg={4}>
                                <Row>
                                    <Col xs lg={6}>
                                        <div className="TeamDetails-stats-matchesplayed">{ stats.matches.played }</div>
                                        <div className="TeamDetails-stats-text">matches played</div>
                                    </Col>
                                    <Col>
                                        <div className="TeamDetails-stats-matcheswon"><span>{ stats.matches.won }</span> won</div>
                                        <div className="TeamDetails-stats-matchesdrawn"><span>{ stats.matches.drawn }</span> drawn</div>
                                        <div className="TeamDetails-stats-matcheslost"><span>{ stats.matches.lost }</span> lost</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <ProgressBar>
                                            <ProgressBar striped variant="success" now={ calculatePorc(stats.matches.won, stats.matches.played) } key={1} />
                                            <ProgressBar striped variant="warning" now={ calculatePorc(stats.matches.drawn, stats.matches.played) } key={2} />
                                            <ProgressBar striped variant="danger" now={ calculatePorc(stats.matches.lost, stats.matches.played) } key={3} />
                                        </ProgressBar>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="TeamDetails-stats-various">
                                <Row>
                                    <Col xs lg={4}>
                                        <div className="TeamDetails-stats-number">{ stats.goals.for }</div>    
                                        <div className="TeamDetails-stats-subtitle">Goals</div>
                                        <div className="TeamDetails-stats-comment">{ stats.goals.forAvg } avg. per match</div>
                                    </Col>
                                    <Col xs lg={4}>
                                        <div className="TeamDetails-stats-number">{ stats.goals.against }</div>    
                                        <div className="TeamDetails-stats-subtitle">Goals conceded</div>
                                        <div className="TeamDetails-stats-comment">{ stats.goals.againstAvg } avg. per match</div>
                                    </Col>
                                    <Col xs lg={4}>
                                        <div className="TeamDetails-stats-number">{ stats.cleanSheet.total }</div>    
                                        <div className="TeamDetails-stats-subtitle">clean sheet</div>
                                        <div className="TeamDetails-stats-comment">{ stats.cleanSheet.avg } avg. per match</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs lg={4}>
                                        <div className="TeamDetails-stats-number">{ stats.cards.yellow }</div>    
                                        <div className="TeamDetails-stats-subtitle">yellow cards</div>
                                        <div className="TeamDetails-stats-comment">{ stats.cards.yellowAvg } avg. per match</div>
                                    </Col>
                                    <Col xs lg={4}>
                                        <div className="TeamDetails-stats-number">{ stats.cards.red }</div>    
                                        <div className="TeamDetails-stats-subtitle">red cards</div>
                                        <div className="TeamDetails-stats-comment">{ stats.cards.redAvg } avg. per match</div>
                                    </Col>
                                    <Col xs lg={4}>
                                        
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                )}
            </Row>

            <Row>
                <Col><h5 className='TeamDetails-subtitle'>Team Squad</h5></Col>
            </Row>
            <Row>
                <Col>
                    <Card className="TeamDetails-card">
                        <Card.Body>
                            { teamSquad.map((player, idx) => 
                            <div key={idx} className="TeamDetails-squad">
                                <div className="TeamDetails-squad-photo"><Image src={ `https://media.api-sports.io/football/players/${player.id}.png` } alt={ player.name } roundedCircle fluid /></div>    
                                <div className="TeamDetails-squad-name">{ player.name }</div>
                                <div className="TeamDetails-squad-pos">{ player.position }</div>
                            </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="TeamDetails-squad">
                
            </div>
        </div>
    );
}

export default TeamDetails;