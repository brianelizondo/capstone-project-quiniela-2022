import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Loading from './Loading';

// import APIFootball api
import APIFootball from './api-football';
// import additionals components
import TeamCard from './TeamCard';

function TeamList(){
    // initial state
    const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        async function getTeams() {
            // get all teams
            setTeams(await APIFootball.getTeams());
        }
        getTeams();
        setLoading(false);
    }, []);

    if(loading){
        return <Loading />;
    }

    return (
        <div className="TeamList col-md-8 offset-md-2">
            <Row>
                <Col>
                    <h1 className='section-title'>Teams in FIFA World Cup 2022</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className='section-subtitle'>List of all teams competing</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="TeamList-list">
                        { teams.map(team => <div key={team.shortName}><TeamCard key={team.shortName} team={team} /></div>) }
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default TeamList;