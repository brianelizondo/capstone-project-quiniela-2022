import React, { useState, useEffect } from 'react';

// import APIFootball api
import APIFootball from "./api-football";

import TeamCard from './TeamCard';

function TeamList(){
    // initial state for quinielas list
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        async function getTeams() {
            const resp = await APIFootball.getTeams();
            setTeams(resp);
        }
        getTeams();
    }, []);

    return (
        <div className="TeamList col-md-8 offset-md-2">
            <h1>Teams in FIFA World Cup 2022</h1>
            <p>List of all teams competing</p>
            
            <div className="TeamList-list">
                { teams.map(team => 
                <div key={team.shortName} className="TeamList-list-card"><TeamCard key={team.shortName} team={team} /></div>
                )}
            </div>
        </div>
    );
}

export default TeamList;