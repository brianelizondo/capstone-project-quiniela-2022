import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Loading from './Loading';
// import APIFootball api
import APIFootball from "./api-football";

import GroupStandings from './GroupStandings';

function GroupList(){
    // initial state
    const [loading, setLoading] = useState(false);
    const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const [groupsStandings, setGroupsStandings] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function getGroupsStandings() {
            const resp = await APIFootball.getGroupsStandings();
            setGroupsStandings(resp);
        }
        getGroupsStandings();
        setLoading(false);
    }, []);

    if(loading){
        return <Loading />;
    }

    return (
        <div className="GroupList col-md-8 offset-md-2">
            <Row>
                <Col>
                    <h1 className='section-title'>Groups in FIFA World Cup 2022</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className='section-subtitle'>List of groups and standings for each group</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="GroupList-details">
                        { groups.map(group => (<GroupStandings key={group} group={group} standings={ groupsStandings.filter(team => team.group === group) } detailsButton={true} />))}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default GroupList;