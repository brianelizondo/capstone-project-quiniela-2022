import React, { useContext } from 'react';
import { FormContext } from './UserQuinielaAdd';
import { Groups, Round16, Quarters, Semis, Place3th, Final } from './UserQuinielaAddForms';

function UserQuinielaAddStep() {
    const { matchesForContext, currentFormStep } = useContext(FormContext);
    let stepContent;

    switch (currentFormStep) {
        case 0:
            stepContent = <Groups matches={matchesForContext.matchesGroups} />;
            break;
        case 1:
            stepContent = <Round16 matches={matchesForContext.matchesRound16} />;
            break;
        case 2:
            stepContent = <Quarters matches={matchesForContext.matchesQuarters} />;
            break;
        case 3:
            stepContent = <Semis matches={matchesForContext.matchesSemis} />;
            break;
        case 4:
            stepContent = <Place3th matches={matchesForContext.matches3thPlace} />;
            break;
        case 5:
            stepContent = <Final matches={matchesForContext.matchesFinal} />
            break;
        default:
            break;
    }

    return stepContent;
}

export default UserQuinielaAddStep;
