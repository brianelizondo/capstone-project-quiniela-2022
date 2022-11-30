import React, { useState, useEffect, useContext } from 'react';
import { FormContext } from '../src/UserQuinielaAdd';
import { Form, Button, Spinner, Col, Row } from "react-bootstrap";
import Loading from "./Loading";
import './UserQuinielaAddForms.css';

import { useNewQuinielaFormik, setNewFormStep, setQuinielasClassifiedTeams, updateTeamsClassifiedContext, checkWinningTeams } from './helpers';
import UserQuinielaAddMatchCard from './UserQuinielaAddMatchCard';

// show form field for groups matches
function Groups({ matches }){
    const [loading, setLoading] = useState(false);
    const [btnSubmitLoading, setBtnSubmitLoading] = useState(false);
    const { currentFormStep, setCurrentFormStep, formData, setFormData } = useContext(FormContext);
    const [matchesCards, setMatchesCards] = useState([]);

    // config formik for matches
    const formik = useNewQuinielaFormik(1, 48, setBtnSubmitLoading, setFormData, formData, setCurrentFormStep, currentFormStep);

    useEffect(() => {
        setLoading(true);
        async function setMatchesInputs(){
            let matchesInput = [];
            matches.forEach(match => {
                matchesInput = [ ...matchesInput, match ];
            });
            setMatchesCards(matchesInput);
        }
        setMatchesInputs();
        setLoading(false);
    }, [matches]);
    
    if(loading){
        return <Loading />;
    }
    
    return (
        <Form onSubmit={formik.handleSubmit} autoComplete="off">            
            { matchesCards.map(match => <UserQuinielaAddMatchCard key={match.id} match={match} formik={formik} /> )}
            
            <Row>
                <Col>
                    <Button variant="primary" type="submit" size="sm" disabled={ btnSubmitLoading } className="UserQuinielaAddForms-button-next">
                        { btnSubmitLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Next" }
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}


// show form field for round 16 matches
function Round16({ matches }){
    const [loading, setLoading] = useState(false);
    const [btnSubmitLoading, setBtnSubmitLoading] = useState(false);
    const { user, currentFormStep, setCurrentFormStep, matchesForContext, setMatchesForContext, formData, setFormData } = useContext(FormContext);
    const [classifiedTeams, setClassifiedTeams] = useState({});
    const [matchesCards, setMatchesCards] = useState([]);

    // config formik for matches
    const formik = useNewQuinielaFormik(49, 56, setBtnSubmitLoading, setFormData, formData, setCurrentFormStep, currentFormStep);

    useEffect(() => {
        setLoading(true);
        async function setMatchesInputs(){
            const respStats = await setQuinielasClassifiedTeams(user, matchesForContext.matchesGroups, formData);
            setClassifiedTeams(respStats);

            matchesForContext.matchesRound16 = updateTeamsClassifiedContext(matchesForContext.matchesRound16, respStats);
            setMatchesForContext(matchesForContext);

            let matchesInput = [];
            matches.forEach(match => {
                matchesInput = [ ...matchesInput, match ];
            });
            setMatchesCards(matchesInput);
        }
        setMatchesInputs();
        setLoading(false);
    }, [matches]);
    
    if(loading){
        return <Loading />;
    }
 
    return (
        <Form onSubmit={formik.handleSubmit} autoComplete="off">            
            { matchesCards.map(match => <UserQuinielaAddMatchCard key={match.id} match={match} formik={formik} classifiedTeams={classifiedTeams} /> )}
            
            <Row>
                <Col>
                    <Button variant="primary" size="sm" onClick={() => setNewFormStep(currentFormStep - 1, setCurrentFormStep) } className="UserQuinielaAddForms-button-back">Back</Button>
                    <Button variant="primary" type="submit" size="sm" disabled={ btnSubmitLoading } className="UserQuinielaAddForms-button-next">
                        { btnSubmitLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Next" }
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}


// show form field for quarters final matches
function Quarters({ matches }){
    const [loading, setLoading] = useState(false);
    const [btnSubmitLoading, setBtnSubmitLoading] = useState(false);
    const { currentFormStep, setCurrentFormStep, matchesForContext, setMatchesForContext, formData, setFormData } = useContext(FormContext);
    const [classifiedTeams, setClassifiedTeams] = useState({});
    const [matchesCards, setMatchesCards] = useState([]);

    // config formik for matches
    const formik = useNewQuinielaFormik(57, 60, setBtnSubmitLoading, setFormData, formData, setCurrentFormStep, currentFormStep);

    useEffect(() => {
        setLoading(true);
        async function setMatchesInputs(){
            const respTeams = checkWinningTeams(matchesForContext.matchesRound16, formData);
            setClassifiedTeams(respTeams);

            matchesForContext.matchesQuarters = updateTeamsClassifiedContext(matchesForContext.matchesQuarters, respTeams);
            setMatchesForContext(matchesForContext);
            
            let matchesInput = [];
            matches.forEach(match => {
                matchesInput = [ ...matchesInput, match ];
            });
            setMatchesCards(matchesInput);
        }
        setMatchesInputs();
        setLoading(false);
    }, [matches]);
    
    if(loading){
        return <Loading />;
    }

    return (
        <Form onSubmit={formik.handleSubmit} autoComplete="off">            
            { matchesCards.map(match => <UserQuinielaAddMatchCard key={match.id} match={match} formik={formik} classifiedTeams={classifiedTeams} /> )}
            
            <Row>
                <Col>
                    <Button variant="primary" size="sm" onClick={() => setNewFormStep(currentFormStep - 1, setCurrentFormStep) } className="UserQuinielaAddForms-button-back">Back</Button>
                    <Button variant="primary" type="submit" size="sm" disabled={ btnSubmitLoading } className="UserQuinielaAddForms-button-next">
                        { btnSubmitLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Next" }
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}


// show form field for semis final matches
function Semis({ matches }){
    const [loading, setLoading] = useState(false);
    const [btnSubmitLoading, setBtnSubmitLoading] = useState(false);
    const { currentFormStep, setCurrentFormStep, matchesForContext, setMatchesForContext, formData, setFormData } = useContext(FormContext);
    const [classifiedTeams, setClassifiedTeams] = useState({});
    const [matchesCards, setMatchesCards] = useState([]);

    // config formik for matches
    const formik = useNewQuinielaFormik(61, 62, setBtnSubmitLoading, setFormData, formData, setCurrentFormStep, currentFormStep);

    useEffect(() => {
        setLoading(true);
        async function setMatchesInputs(){
            const respTeams = checkWinningTeams(matchesForContext.matchesQuarters, formData);
            setClassifiedTeams(respTeams);

            matchesForContext.matchesSemis = updateTeamsClassifiedContext(matchesForContext.matchesSemis, respTeams);
            setMatchesForContext(matchesForContext);
            
            let matchesInput = [];
            matches.forEach(match => {
                matchesInput = [ ...matchesInput, match ];
            });
            setMatchesCards(matchesInput);
        }
        setMatchesInputs();
        setLoading(false);
    }, [matches]);
    
    if(loading){
        return <Loading />;
    }

    return (
        <Form onSubmit={formik.handleSubmit} autoComplete="off">            
            { matchesCards.map(match => <UserQuinielaAddMatchCard key={match.id} match={match} formik={formik} classifiedTeams={classifiedTeams} /> )}
            
            <Row>
                <Col>
                    <Button variant="primary" size="sm" onClick={() => setNewFormStep(currentFormStep - 1, setCurrentFormStep) } className="UserQuinielaAddForms-button-back">Back</Button>
                    <Button variant="primary" type="submit" size="sm" disabled={ btnSubmitLoading } className="UserQuinielaAddForms-button-next">
                        { btnSubmitLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Next" }
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}


// show form field for 3th place match
function Place3th({ matches }){
    const [loading, setLoading] = useState(false);
    const [btnSubmitLoading, setBtnSubmitLoading] = useState(false);
    const { currentFormStep, setCurrentFormStep, matchesForContext, setMatchesForContext, formData, setFormData } = useContext(FormContext);
    const [classifiedTeams, setClassifiedTeams] = useState({});
    const [matchesCards, setMatchesCards] = useState([]);

    // config formik for matches
    const formik = useNewQuinielaFormik(63, 63, setBtnSubmitLoading, setFormData, formData, setCurrentFormStep, currentFormStep);

    useEffect(() => {
        setLoading(true);
        async function setMatchesInputs(){
            const respTeams = checkWinningTeams(matchesForContext.matchesSemis, formData);
            setClassifiedTeams(respTeams);

            matchesForContext.matches3thPlace = updateTeamsClassifiedContext(matchesForContext.matches3thPlace, respTeams);
            setMatchesForContext(matchesForContext);
            
            let matchesInput = [];
            matches.forEach(match => {
                matchesInput = [ ...matchesInput, match ];
            });
            setMatchesCards(matchesInput);
        }
        setMatchesInputs();
        setLoading(false);
    }, [matches]);
    
    if(loading){
        return <Loading />;
    }

    return (
        <Form onSubmit={formik.handleSubmit} autoComplete="off">            
            { matchesCards.map(match => <UserQuinielaAddMatchCard key={match.id} match={match} formik={formik} classifiedTeams={classifiedTeams} /> )}
            
            <Row>
                <Col>
                    <Button variant="primary" size="sm" onClick={() => setNewFormStep(currentFormStep - 1, setCurrentFormStep) } className="UserQuinielaAddForms-button-back">Back</Button>
                    <Button variant="primary" type="submit" size="sm" disabled={ btnSubmitLoading } className="UserQuinielaAddForms-button-next">
                        { btnSubmitLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Next" }
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}


// show form field for final match
function Final({ matches }){
    const [loading, setLoading] = useState(false);
    const [btnSubmitLoading, setBtnSubmitLoading] = useState(false);
    const { currentFormStep, setCurrentFormStep, matchesForContext, setMatchesForContext, formData, setFormData, saveQuiniela } = useContext(FormContext);
    const [classifiedTeams, setClassifiedTeams] = useState({});
    const [matchesCards, setMatchesCards] = useState([]);

    // config formik for matches
    const formik = useNewQuinielaFormik(64, 64, setBtnSubmitLoading, setFormData, formData, setCurrentFormStep, currentFormStep, saveQuiniela);

    useEffect(() => {
        setLoading(true);
        async function setMatchesInputs(){
            const respTeams = checkWinningTeams(matchesForContext.matchesSemis, formData);
            setClassifiedTeams(respTeams);

            matchesForContext.matchesFinal = updateTeamsClassifiedContext(matchesForContext.matchesFinal, respTeams);
            setMatchesForContext(matchesForContext);
            
            let matchesInput = [];
            matches.forEach(match => {
                matchesInput = [ ...matchesInput, match ];
            });
            setMatchesCards(matchesInput);
        }
        setMatchesInputs();
        setLoading(false);
    }, [matches]);
    
    if(loading){
        return <Loading />;
    }

    return (
        <Form onSubmit={formik.handleSubmit} autoComplete="off">            
            { matchesCards.map(match => <UserQuinielaAddMatchCard key={match.id} match={match} formik={formik} classifiedTeams={classifiedTeams} /> )}
            
            <Row>
                <Col>
                    <Button variant="primary" size="sm" onClick={() => setNewFormStep(currentFormStep - 1, setCurrentFormStep) } className="UserQuinielaAddForms-button-back">Back</Button>
                    <Button variant="primary" type="submit" size="sm" disabled={ btnSubmitLoading } className="UserQuinielaAddForms-button-next">
                        { btnSubmitLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Save Quiniela" }
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export {
    Groups,
    Round16,
    Quarters,
    Semis,
    Place3th,
    Final
}