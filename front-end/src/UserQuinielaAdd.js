import React, { useState, useEffect, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserQuinielaAddStep from './UserQuinielaAddStep';
import { Row, Col } from 'react-bootstrap';
import FormStepper from './FormStepper';
import Loading from "./Loading";
import './UserQuinielaAdd.css'

// import APIFootball api
import APIFootball from "./api-football";
// form context to use with the form
export const FormContext = createContext();

function UserQuinielaAdd(){
    // initial states
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [currentFormStep, setCurrentFormStep] = useState(0);
    const [formData, setFormData] = useState({});
    const formSteps = ['Groups Matches', 'Round of 16', 'Quarter-Finals', 'Semi-Finals', '3rd Place', 'Final'];

    // state data for user from redux
    const user = useSelector((state) => state.user);
    // matches data from database
    const [matchesForContext, setMatchesForContext] = useState({});

    // handle te create quiniela process
    async function saveQuiniela(){
        // set the matches data from context
        const matchesData = {
            R16: matchesForContext.matchesRound16,            
            QF: matchesForContext.matchesQuarters,            
            SF: matchesForContext.matchesSemis,            
            "3P": matchesForContext.matches3thPlace,            
            F: matchesForContext.matchesFinal
        };

        // call the API to create a new quiniela and redirect
        APIFootball.token = user.token;
        await APIFootball.createNewQuiniela(user, matchesData, formData);
        history.push(`/users/${user.username}/profile`);
    }
    
    useEffect(() => {
        // set matches from database
        async function getMatches(){
            // get the phase 1 matches
            const respPhase1 = await APIFootball.getPhaseMatches(1);
            let matchesContext = { 
                matchesGroups: respPhase1, 
                matchesRound16: [],
                matchesQuarters: [],
                matchesSemis: [],
                matches3thPlace: [],
                matchesFinal: []
            };

            // get the phase 2 matches and assing to each phase
            const respPhase2 = await APIFootball.getPhaseMatches(2);
            respPhase2.forEach(match => {
                switch (match.phase){
                    case 'R16':
                        matchesContext.matchesRound16 = [...matchesContext.matchesRound16, match];
                        break;
                    case 'QF':
                        matchesContext.matchesQuarters = [...matchesContext.matchesQuarters, match];
                        break;
                    case 'SF':
                        matchesContext.matchesSemis = [...matchesContext.matchesSemis, match];
                        break;
                    case '3P':
                        matchesContext.matches3thPlace = [...matchesContext.matches3thPlace, match];
                        break;
                    case 'F':
                        matchesContext.matchesFinal = [...matchesContext.matchesFinal, match];
                        break;
                    default:
                        break;
                }
            });
            // set all matches to the form context
            setMatchesForContext(matchesContext);
        }
        getMatches();
        setLoading(false);
    }, [user.username]);

    if(loading){
        return <Loading />;
    }
    return (
        <div className="UserQuinielaAdd col-md-8 offset-md-2">
            <Row>
                <Col>
                    <h1 className='section-title'>Add New Quiniela</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className='section-subtitle'>Matches list of Groups, Round of 16, Quarter-Finals, Semi-Finals, 3th Place & Final</h5>
                </Col>
            </Row>

            <FormContext.Provider value={{ user, matchesForContext, setMatchesForContext, currentFormStep, setCurrentFormStep, formData, setFormData, saveQuiniela }}>
                <Row>
                    <Col className="UserQuinielaAdd-stepper">
                        <FormStepper steps={ formSteps } />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <UserQuinielaAddStep />
                    </Col>
                </Row>
            </FormContext.Provider>
        </div>
    );
};

export default UserQuinielaAdd;