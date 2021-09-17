/* eslint-disable */
 
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        alignContent: 'left',
        display: 'flex',
        background: '#363a59' 
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    label: {
        fontSize: '24px !important',
        fontFamily: 'TT Norms',
        color: '#363a59',
        textAlign: 'left',
        marginLeft: '10px'
    },
    content: {
        fontSize: '16px',
        fontFamily: 'TT Norms Light',
        textAlign: 'left',
        marginLeft: '10px'
    },
    icon: {
        color: "#363a59 !important"
      },
    completed: {
        color: 'green !important'
    }

}));

function getSteps() {
    return ['Rekisteröi käyttäjä', 'Luo profiili', 'Vastaa ensimmäiseen kyselyyn'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `Jos et ole vielä rekisteröinyt, niin tee se tästä. Muussa tapauksessa kirjaudu sisään`;
        case 1:
            return `Päivitä profiilisi tiedot, jotta voit aloittaa pisteiden keräilyn ja
                ansaita lahjakortteja sekä muita mahtavia etuja. Lisäksi voit nähdä
                sijoittumisesi leaderboardeilla ja näyttää aktiivisuutesi muille vaikuttajille! `;
        case 2:
            return `Vastaa kyselyihin ja ansaitse lisää pisteitä! Jo muutaman kyseyln jälkeen voit voittaa lahjakortteja.`;
        default:
            return 'Unknown step';
    }
}

export default function HomeStepper(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(props.startStep);
    const steps = getSteps();

    const handleNext = (e) => {
        e.preventDefault();
        if (props.startStep === 1) {
            window.location.href = '/profile/create';
        } else if (props.startStep === 2) {
            window.location.href = '/kyselyt'
        } else {
            window.location.href = '/signin'
        }
    };



    return (
        <Typography className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel StepIconProps={{
                                classes: {
                                    active: classes.icon,
                                    completed: classes.completed
                            }
                            }} >
                            <div 
                            className={classes.label}
                            >{label}</div>
                        </StepLabel>
                        <StepContent>
                            <div className={classes.content}>{getStepContent(index)}</div>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === 2 ? 'Kerää' :
                                            activeStep === 1 ? 'Päivitä' :
                                                'Rekisteröidy'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Typography>
    );
}