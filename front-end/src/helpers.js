// general helper functions
import { useFormik } from 'formik';

// import APIFootball api
import APIFootball from "./api-football";

// function to create a new Formik object to assign a form
function useNewQuinielaFormik(matchStart, matchEnd, setBtnSubmitLoading, setFormData, formData, setCurrentFormStep, currentFormStep, saveQuiniela){
    // config new formik object to the form
    // set the initial values
    const initialValues = quinielaInitialValues(matchStart, matchEnd, formData);
    // set the validator function
    const validate = (values) => {
        return quinielaValidateResults(values, matchStart, matchEnd);
    }
    // set the new Formik objet
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: async (values) => {
            setBtnSubmitLoading(true);
            setFormData({ ...formData, ...values });
            if(currentFormStep === 5){
                await saveQuiniela();
            }else{
                setCurrentFormStep(currentFormStep + 1);
            }
            setBtnSubmitLoading(false);
        }
    });

    return formik;
}

// function to create al fields used for the form and initial state
function quinielaInitialValues(matchesStart, matchesEnd, formData){
    let INITIAL_VALUES = {};
    for(let i=matchesStart; i<=matchesEnd; i++){
        INITIAL_VALUES[`match_${i}_team_a`] = formData[`match_${i}_team_a`] ? formData[`match_${i}_team_a`] : "";
        INITIAL_VALUES[`match_${i}_team_b`] = formData[`match_${i}_team_b`] ? formData[`match_${i}_team_b`] : "";
    };

    return INITIAL_VALUES;
}

// function to validate the values of the quiniela goals results
function quinielaValidateResults(values, matchesStart, matchesEnd){
    const errors = {};
    for(let i=matchesStart; i<=matchesEnd; i++){
        if(!values[`match_${i}_team_a`]){
            errors[`match_${i}_team_a`] = 'Required';
        }else if (!/^[0-9]+/i.test(values[`match_${i}_team_a`])) {
            errors[`match_${i}_team_a`] = 'Only numbers';
        }else if(Number(values[`match_${i}_team_a`]) < 0) {
            errors[`match_${i}_team_a`] = 'Must be greater than or equal to 0';
        }

        if(!values[`match_${i}_team_b`]){
            errors[`match_${i}_team_b`] = 'Required';
        }else if (!/^[0-9]+/i.test(values[`match_${i}_team_b`])) {
            errors[`match_${i}_team_b`] = 'Only numbers';
        }else if(Number(values[`match_${i}_team_b`]) < 0) {
            errors[`match_${i}_team_b`] = 'Must be greater than or equal to 0';
        }
    }
  
    return errors;
};

// function to set the current step of the quiniela add form
function setNewFormStep(step, setCurrentFormStep){
    setCurrentFormStep(step);
}

// function to send the groups result and get the teams classified to the R16 phase
async function setQuinielasClassifiedTeams(user, matches, formData){
    try{
        // get the classified teams for each groups
        APIFootball.token = user.token;
        let resp = await APIFootball.setQuinielasClassifiedTeams(user, matches, formData);
        return resp;
    }catch (err){
        return err;
    }
}

// function for update the context with tha classifed teams
function updateTeamsClassifiedContext(matches, classifiedTeams){
    for(let match of matches){
        match.teamA = Object.assign({}, classifiedTeams[match.teamA_classified]);
        match.teamB = Object.assign({}, classifiedTeams[match.teamB_classified]);
    }
    return matches;
}

// function to check the won/lost or draw of the matches
function checkWinningTeams(matches, formData){
    let winnignTeams ={};
    for(let match of matches){
        const teamA_matchResult = Number(formData[`match_${match.id}_team_a`]);
        const teamB_matchResult = Number(formData[`match_${match.id}_team_b`]);

        if(teamA_matchResult > teamB_matchResult){
            winnignTeams[`Winner ${match.id}`] = Object.assign({}, match.teamA);
            winnignTeams[`Loser ${match.id}`] = Object.assign({}, match.teamB);
        }else if(teamA_matchResult < teamB_matchResult){
            winnignTeams[`Winner ${match.id}`] = Object.assign({}, match.teamB);
            winnignTeams[`Loser ${match.id}`] = Object.assign({}, match.teamA);
        }else if(teamA_matchResult === teamB_matchResult){
            winnignTeams[`Winner ${match.id}`] = Object.assign({}, match.teamA);
            winnignTeams[`Loser ${match.id}`] = Object.assign({}, match.teamB);
        }
    }
    return winnignTeams;
}

export {
    useNewQuinielaFormik,
    quinielaInitialValues,
    quinielaValidateResults,
    setNewFormStep,
    setQuinielasClassifiedTeams,
    updateTeamsClassifiedContext,
    checkWinningTeams
};