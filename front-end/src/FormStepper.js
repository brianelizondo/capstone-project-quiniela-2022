import React, { useContext } from 'react';
import { FormContext } from './UserQuinielaAdd';
import { Stepper, Step, StepLabel } from '@mui/material';

// component to show the stepper in the 'UserQuinielaAdd' component
function FormStepper({ steps }){
    const { currentFormStep } = useContext(FormContext);

    return (
        <Stepper activeStep={currentFormStep} alternativeLabel>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
}

export default FormStepper;