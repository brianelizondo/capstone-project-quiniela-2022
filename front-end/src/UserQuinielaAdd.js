import React, { useState, useEffect, createContext } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import UserQuinielaAddStep from './UserQuinielaAddStep';
import FormStepper from './FormStepper';
import Loading from "./Loading";
import './UserQuinielaAdd.css'

// import APIFootball api
import APIFootball from "./api-football";

export const FormContext = createContext();

function UserQuinielaAdd(){
    // initial states
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [currentFormStep, setCurrentFormStep] = useState(0);
    const [formData, setFormData] = useState({});
    const formSteps = ['Groups Matches', 'Round of 16', 'Quarter-Finals', 'Semi-Finals', '3rd Place', 'Final'];

    // state data for user from redux
    const user = useSelector((state) => state.user);
    // matches data from database
    const [matchesForContext, setMatchesForContext] = useState({});

    // redirect after save quiniela
    async function saveQuiniela(){
        const matchesData = {
            R16: matchesForContext.matchesRound16,            
            QF: matchesForContext.matchesQuarters,            
            SF: matchesForContext.matchesSemis,            
            "3P": matchesForContext.matches3thPlace,            
            F: matchesForContext.matchesFinal
        };

        APIFootball.token = user.token;
        await APIFootball.createNewQuiniela(user, matchesData, formData);
        history.push(`/users/${user.username}/profile`);
    }
    
    useEffect(() => {
        setLoading(true);
        // set matches from database
        async function getMatches(){
            const respPhase1 = await APIFootball.getPhaseMatches(1);
            let matchesContext = { 
                matchesGroups: respPhase1, 
                matchesRound16: [],
                matchesQuarters: [],
                matchesSemis: [],
                matches3thPlace: [],
                matchesFinal: []
            };

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
            <h1>Add New Quiniela</h1>
            <p>Matches list of Groups, Round of 16, Quarter-Finals, Semi-Finals, 3th Place & Final</p>

            <FormContext.Provider value={{ user, matchesForContext, setMatchesForContext, currentFormStep, setCurrentFormStep, formData, setFormData, saveQuiniela }}>
                <div>
                    <FormStepper steps={ formSteps } />
                </div>
                <div>
                    <UserQuinielaAddStep />
                </div>
            </FormContext.Provider>
        </div>
    );
};

export default UserQuinielaAdd;