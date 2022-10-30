import React, { useState, useEffect } from 'react';

import QuinielaListCard from './QuinielaListCard';

// import APIFootball api
import APIFootball from "./api-football";

function Home(){
    // initial state for quinielas list
    const [quinielas, setQuinielas] = useState([]);

    useEffect(() => {
        async function getQuinielas() {
            const resp = await APIFootball.getQuinielas();
            setQuinielas(resp);
        }
        getQuinielas();
    }, [quinielas]);

    return (
        <div className="Home col-md-8 offset-md-2">
            <h1>Quinielas World Cup 2022</h1>
            <p>List of active and participating quinielas</p>
            
            <div className="Home-quiniela-list">
                { quinielas.map((quiniela, idx) => (<QuinielaListCard key={quiniela.quinielaID} quiniela={quiniela} position={idx} />))}
            </div>
        </div>
    );
}

export default Home;