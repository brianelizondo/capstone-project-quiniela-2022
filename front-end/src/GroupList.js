import React, { useState, useEffect } from 'react';

// import APIFootball api
import APIFootball from "./api-football";

import GroupStandings from './GroupStandings';

function GroupList(){
    // initial state for quinielas list
    const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const [groupsStandings, setGroupsStandings] = useState([]);

    useEffect(() => {
        async function getGroupsStandings() {
            const resp = await APIFootball.getGroupsStandings();
            setGroupsStandings(resp);
        }
        getGroupsStandings();
    }, []);

    return (
        <div className="GroupList col-md-8 offset-md-2">
            <h1>Groups in FIFA World Cup 2022</h1>
            <p>Standings for each group</p>
            
            <div className="GroupList-details">
                { groups.map(group => (<GroupStandings key={group} group={group} standings={ groupsStandings.filter(team => team.group == group) } detailsButton={true} />))}
            </div>
        </div>
    );
}

export default GroupList;