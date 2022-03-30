/* eslint-disable */

import React, { useState } from 'react';
import { Form, Button as Btn } from 'react-bootstrap';
// import kyselyt from '../../assets/js/kyselyt';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import SurveyModal from '../parts/SurveyModal';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { useMediaQuery } from '@material-ui/core';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';

const useStyles = makeStyles( theme => ({
    root: {
        maxWidth: 1500,
        flexGrow: 2,
        [theme.breakpoints.down('600')]: {
            backgroundColor: '#ffcf00',
            height: '60px'
        }
    },
}));





function Choices(n, kyselyt) {
    const listItems = kyselyt.map((d) => d.kysymykset);
    const choices = listItems[0];
    const kys = choices.map((d) => d.choices);
    return kys[n];
}

function CreateForm(x, setField, kyselyt) {
    var choices = kyselyt.map((d) => d.kysymykset)[0]
    var type = choices.map((d) => d.type)[x]
    var group = choices.map((d) => d.group)
    // var min = choices.map((d) => d.min)[x]
    var max = choices.map((d) => d.max)[x]
    var key = choices.map((d) => d.num)[x]
    var new_group = false
    if (x === 0 || group[x] !== group[x - 1]) { new_group = true } else { new_group = false }



    return (

        <Form.Group key={key} controlId={key}>
            <Form.Label key={key + '_1'}>{kyselyt.map((d) => d.kysymykset)[0].map((y) => y.title)[x]}</Form.Label>
            {
                type === 'multi' ?
                    <Form.Control
                        required
                        key={key + '_2'}
                        as='select'
                        multiple htmlSize={Choices(x, kyselyt).length}
                        onChange={e => setField(key, Array.from(e.target.selectedOptions, option => option.value))}
                    >{Choices(x, kyselyt).map(x => <option value={x}>{x}</option>)}

                    </Form.Control> :
                    type === 'single' ?
                        <Form.Control
                            required
                            key={key + '_2'}
                            as='select'
                            onChange={e => setField(key, e.target.value)}
                            defaultValue=''
                        >
                            <option className='text-muted' value='' disabled >Valitse yksi:</option>
                            {Choices(x, kyselyt).map(x => <option value={x}>{x}</option>)}
                        </Form.Control> :
                        type === 'range' ?
                            <div className='row px-2'>
                                <Rating
                                    required
                                    name={"rating" + key}
                                    defaultValue={0}
                                    key={key + '_2'}
                                    max={max}
                                    size="large"
                                    onChange={e => setField(key, e.target.value)}
                                />
                            </div>
                            :
                            <Form.Control
                                required
                                as='textarea'
                                key={key + '_2'}
                                onChange={e => setField(key, e.target.value)}
                            >
                            </Form.Control>
            }
        </Form.Group>

    );
}

function CreateKysely(setField, kyselyt) {
    const listItems = kyselyt.map((d) => d.kysymykset);
    const choices = listItems[0];
    const kys = choices.map((d) => d.choices);
    const items = [];
    var i;
    for (i = 0; i < kys.length; i++) {
        items.push(CreateForm(i, setField, kyselyt));
    }
    return items;
}


const FormFunction = (props) => {

    const kyselyt = props.kyselyt
    const [form, setForm] = useState({})

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }
    // console.log(form)

    const formData = (id, form) => {

        const data = {
            id,
            formData: form,
            responded: true,
            dateSent: Date.now(),
            kyselyTitle: kyselyt.map((d) => d.kyselyTitle)[0],
            points: kyselyt.map((d) => d.pointCount)[0]
        }

        return data
    }


    const id = props.question

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(form)


        axios.all([
            axios.post('/api/surveys', formData(id, form)),
            axios.post('/api/profile/points', formData(id, form))
        ]).then(axios.spread((res1, res2) => {
            const status1 = res1.status;
            const status2 = res2.status;
            // console.log('res1', res1, 'res2', res2)
            if (status1 === 200) {
                setModalShow(true)
            }
            if (status2 === 200) {
                // console.log('points updated')
            }
        })

        );

    };

    const [modalShow, setModalShow] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const pointCount = kyselyt.map((d) => d.pointCount)[0]
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {

        if (form[activeStep + 1] !== undefined) {
            setOpenAlert(false);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            setOpenAlert(true);
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const hideModal = () => {
        setModalShow(false);
        window.location = "/home"
    };

    var items = CreateKysely(setField, kyselyt)
    const steps = kyselyt.map((d) => d.kysymykset)[0].map((d) => d.choices).length;
    var group = kyselyt.map((d) => d.kysymykset)[0].map((d) => d.group)

    const isMobile = useMediaQuery('(min-width:600px)');
    var stepperPosition = 'bottom'
    isMobile ? stepperPosition = 'static' : stepperPosition = 'bottom'

    return (
        <form onSubmit={handleSubmit}>
            <h2>{props.title}</h2>

            <MobileStepper
                variant="progress"
                steps={steps}
                position={stepperPosition}
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === steps - 1}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
            <h4 className='group-name'>{group[activeStep]}</h4>
            <hr className='group-line' />

            {items[activeStep]}
            {activeStep === (steps - 1) ?
                <div>
                    <Btn
                        type="submit"
                        className='btn btn-lg btn-block text-uppercase btn-warning btn-send'
                    >Lähetä</Btn>
                    <SurveyModal
                        show={modalShow}
                        onHide={hideModal}
                        pointCount={pointCount}
                        currentPoints={props.currentPoints}
                    />
                </div>
                :
                null

            }

            <Box sx={{ width: '100%' }}>
                <Collapse in={openAlert}>
                    <Alert
                        severity="info"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpenAlert(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        <AlertTitle><strong>Huom</strong></AlertTitle>
                        Sinun täytyy vastata kysymykseen, ennen kun voit edetä!
                    </Alert>
                </Collapse>
            </Box>
        </form>

    )
};


export default FormFunction






