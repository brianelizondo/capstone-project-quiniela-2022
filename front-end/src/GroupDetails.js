import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import APIFootball api
import APIFootball from "./api-football";

import GroupStandings from './GroupStandings';
import MatchCard from './MatchCard';

function GroupDetails(){
    // initial state for quinielas list
    const { group } = useParams();
    const [groupsStandings, setGroupsStandings] = useState([]);
    const [groupMatches, setGroupMatches] = useState([]);

    useEffect(() => {
        async function getGroupsStandings() {
            const resp = await APIFootball.getGroupsStandings();
            setGroupsStandings(resp);
        }
        getGroupsStandings();

        async function getGroupMatches() {
            const resp = await APIFootball.getGroupMatches(group);
            setGroupMatches(resp);
        }
        getGroupMatches();
    }, []);

    return (
        <div className="GroupDetails col-md-8 offset-md-2">
            <h1>Groups in FIFA World Cup 2022</h1>
            <p>Details for group "{group}"</p>
            
            <h4>Group Standings</h4>
            <div className="GroupDetails-standings">
                <GroupStandings key={group} group={group} standings={ groupsStandings.filter(team => team.group == group) } detailsButton={false} />
            </div>

            <h4>Group Matches</h4>
            <div className="GroupDetails-matches">
                { groupMatches.map(match => <MatchCard key={match.id} match={match} />) }
            </div>
        </div>
    );
}

export default GroupDetails;