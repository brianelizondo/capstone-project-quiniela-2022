import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Loading from './Loading';
import './GroupDetails.css';

// import APIFootball api
import APIFootball from "./api-football";

import GroupStandings from './GroupStandings';
import MatchCard from './MatchCard';

function GroupDetails(){
    // initial state
    const { group } = useParams();
    const [loading, setLoading] = useState(false);
    const [groupsStandings, setGroupsStandings] = useState([]);
    const [groupMatches, setGroupMatches] = useState([]);
    const [matchesGoals, setMatchesGoals] = useState({});

    useEffect(() => {
        setLoading(true);
        async function getGroupsStandings() {
            const resp = await APIFootball.getGroupsStandings();
            setGroupsStandings(resp);
        }
        getGroupsStandings();

        async function getGroupMatches() {
            const resp = await APIFootball.getGroupMatches(group);
            setGroupMatches(resp);

            const goalsAPI = await APIFootball.getMatchesGoals();
            setMatchesGoals(goalsAPI);
        }
        getGroupMatches();
        setLoading(false);
    }, [group]);

    if(loading){
        return <Loading />;
    }

    return (
        <div className="GroupDetails col-md-8 offset-md-2">
            <Row>
                <Col>
                    <h1 className='section-title'>Details of the Group "{group}"</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className='GroupDetails-subtitle'>Group Standings</h5>
                    <div className="GroupDetails-standings">
                        <GroupStandings key={group} group={group} standings={ groupsStandings.filter(team => team.group === group) } detailsButton={false} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className='GroupDetails-subtitle'>Group Matches</h5>
                    <div className="GroupDetails-matches">
                        { groupMatches.map(match => <MatchCard key={match.id} match={match} matchesGoals={matchesGoals} />) }
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default GroupDetails;