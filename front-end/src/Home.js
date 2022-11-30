import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Loading from './Loading';
import QuinielaListCard from './QuinielaListCard';
import './Home.css';

// import APIFootball api
import APIFootball from "./api-football";

function Home(){
    // initial state
    const [loading, setLoading] = useState(false);
    const [quinielas, setQuinielas] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function getQuinielas() {
            const resp = await APIFootball.getQuinielas();
            setQuinielas(resp);
        }
        getQuinielas();
        setLoading(false);
    }, []);

    if(loading){
        return <Loading />;
    }

    return (
        <div className="Home col-md-8 offset-md-2">
            <Row>
                <Col>
                    <h1 className='section-title'>Quinielas World Cup 2022</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className='section-subtitle'>List of active and participating quinielas</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="Home-quiniela-list">
                        { quinielas.map((quiniela, idx) => (<QuinielaListCard key={quiniela.quinielaID} quiniela={quiniela} position={idx} />))}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Home;