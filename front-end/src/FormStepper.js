import React, { useContext } from 'react';
import { FormContext } from './UserQuinielaAdd';
import { Stepper, Step, StepLabel } from '@mui/material';
  
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