import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Card, Row, Col, Spinner, Form, FloatingLabel, Button } from 'react-bootstrap';
import Loading from './Loading';
import './UserMatchUpdate.css';

// import APIFootball api
import APIFootball from "./api-football";

function UserMatchUpdate(){
    // initial state
    const user = useSelector((state) => state.user);
    APIFootball.token = user.token;
    
    const history = useHistory();
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [btnSubmitLoading, setBtnSubmitLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function getTeams() {
            const resp = await APIFootball.getTeams();
            setTeams(resp);
        }
        getTeams();
        setLoading(false);
    }, [user.token]);
    

    // handle update action from back-end request
    const handleUpdate = async (values) => {
        setBtnSubmitLoading(true);
        await APIFootball.updateGoalsTeams(values);
        history.go(0);
        setBtnSubmitLoading(false);
    }
    // set form for update matches in phase 1 and 2
    const p1Formik = useFormik({
        initialValues: {
            matchID: '',
            teamA_result: '',
            teamB_result: ''
        },
        onSubmit: async (values) => {
            await handleUpdate(values);
        }
    });
    let p1MatchesList = [];
    for(let x=1; x<=48; x++){
        p1MatchesList.push(<option key={x} value={x}>Match {x}</option>);
    }

    const p2Formik = useFormik({
        initialValues: {
            matchID: '',
            teamA_id: '',
            teamA_result: '',
            teamB_id: '',
            teamB_result: '',
            match_apiID: ''
        },
        onSubmit: async (values) => {
            await handleUpdate(values);
        }
    });
    let p2MatchesList = [];
    for(let x=49; x<=64; x++){
        p2MatchesList.push(<option key={x} value={x}>Match {x}</option>);
    }

    if(loading){
        return <Loading />;
    }

    return (
        <div className="UserMatchUpdate col-md-8 offset-md-2">
            <Row>
                <Col>
                    <h1 className='section-title'>@{ user.username.toUpperCase() }</h1>
                </Col>
            </Row>
            <Row>
                <Col><h5 className='UserMatchUpdate-subtitle'>Update match in Phase 1</h5></Col>
            </Row>
            <Row>
                <Col>
                    <form onSubmit={p1Formik.handleSubmit}>
                        <Card className="UserMatchUpdate-form-card">
                            <Row>
                                <Col>
                                    <FloatingLabel controlId="matchID" label="Select Match Number">
                                        <Form.Select name="matchID" aria-label="Select Match Number"
                                            onChange={p1Formik.handleChange}
                                            onBlur={p1Formik.handleBlur}
                                            value={p1Formik.values.matchID}>
                                            <option key={0} value={0}>Select Match</option>
                                            { p1MatchesList.map(match => match) }
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel controlId="teamA_result" label="Team A goals" className="mb-3">
                                        <Form.Control name="teamA_result" type="number" placeholder="Team A goals"
                                            onChange={p1Formik.handleChange}
                                            onBlur={p1Formik.handleBlur}
                                            value={p1Formik.values.teamA_result}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel controlId="teamB_result" label="Team B goals" className="mb-3">
                                        <Form.Control name="teamB_result" type="number" placeholder="Team B goals"
                                            onChange={p1Formik.handleChange}
                                            onBlur={p1Formik.handleBlur}
                                            value={p1Formik.values.teamB_result}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit" size="lg" disabled={ btnSubmitLoading }>
                                        { btnSubmitLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Update Match" }
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </form>
                </Col>
            </Row>
            
            <Row>
                <Col><h5 className='UserMatchUpdate-subtitle'>Update match in Phase 2</h5></Col>
            </Row>
            <Row>
                <Col>
                    <form onSubmit={p2Formik.handleSubmit}>
                        <Card className="UserMatchUpdate-form-card">
                            <Row>
                                <Col>
                                    <FloatingLabel controlId="matchID" label="Select Match Number">
                                        <Form.Select name="matchID" aria-label="Select Match Number"
                                            onChange={p2Formik.handleChange}
                                            onBlur={p2Formik.handleBlur}
                                            value={p2Formik.values.matchID}>
                                            <option key={0} value={0}>Select Match</option>
                                            { p2MatchesList.map(match => match) }
                                        </Form.Select>
                                    </FloatingLabel>
                                    <FloatingLabel controlId="match_apiID" label="Match API ID" className="mb-3">
                                        <Form.Control name="match_apiID" type="number" placeholder="Match API ID"
                                            onChange={p2Formik.handleChange}
                                            onBlur={p2Formik.handleBlur}
                                            value={p2Formik.values.match_apiID}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel controlId="teamA_id" label="Select Team A">
                                        <Form.Select name="teamA_id" aria-label="Select Team A"
                                            onChange={p2Formik.handleChange}
                                            onBlur={p2Formik.handleBlur}
                                            value={p2Formik.values.teamA_id}>
                                            <option key={0} value={0}></option>
                                            { teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>) }
                                        </Form.Select>
                                    </FloatingLabel>
                                    <FloatingLabel controlId="teamA_result" label="Team A goals" className="mb-3">
                                        <Form.Control name="teamA_result" type="number" placeholder="Team A goals"
                                            onChange={p2Formik.handleChange}
                                            onBlur={p2Formik.handleBlur}
                                            value={p2Formik.values.teamA_result}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel controlId="teamB_id" label="Select Team B">
                                        <Form.Select name="teamB_id" aria-label="Select Team B"
                                            onChange={p2Formik.handleChange}
                                            onBlur={p2Formik.handleBlur}
                                            value={p2Formik.values.teamB_id}>
                                            <option key={0} value={0}></option>
                                            { teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>) }
                                        </Form.Select>
                                    </FloatingLabel>
                                    <FloatingLabel controlId="teamB_result" label="Team B goals" className="mb-3">
                                        <Form.Control name="teamB_result" type="number" placeholder="Team B goals"
                                            onChange={p2Formik.handleChange}
                                            onBlur={p2Formik.handleBlur}
                                            value={p2Formik.values.teamB_result}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit" size="lg" disabled={ btnSubmitLoading }>
                                        { btnSubmitLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Update Match" }
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </form>
                </Col>
            </Row>
        </div>
    );
}

export default UserMatchUpdate;