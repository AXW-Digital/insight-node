/* eslint-disable */
 
import React, { useState } from 'react';
import { Form, Button as Btn } from 'react-bootstrap';
import kyselyt from '../../assets/js/kyselyt';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import { SignupModalQuestion } from '../parts/SurveyModal';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
    root: {
        maxWidth: 1500,
        flexGrow: 2,
    },
});


function Choices(n, q) {
    const listItems = kyselyt.map((d) => d.kysymykset);
    const choices = listItems[q];
    const kys = choices.map((d) => d.choices);
    return kys[n];
}

function CreateForm(x, q, setField) {
    var choices = kyselyt.map((d) => d.kysymykset)[q]
    var type = choices.map((d) => d.type)[x]
    var group = choices.map((d) => d.group)
    // var min = choices.map((d) => d.min)[x]
    var max = choices.map((d) => d.max)[x]
    var key = choices.map((d) => d.num)[x]
    var new_group = false
    var draw_line = false
    if (x === 0 || group[x] !== group[x - 1]) { new_group = true } else { new_group = false }
    if (x !== 0 && new_group === true) { draw_line = true } else { draw_line = false }


    return (

        <Form.Group key={key} controlId={key} className = 'landing-form d-flex justify-content-center'>
            <div className = 'row'>
                <h5 className = 'col-12 text-center mb-3'><Form.Label key={key + '_1'}>{kyselyt.map((d) => d.kysymykset)[q].map((y) => y.title)[x]}</Form.Label></h5>
            {
                type === 'multi' ?
                    <Form.Control
                        key={key + '_2'}
                        as='select'
                        multiple htmlSize={Choices(x, q).length}
                        onChange={e => setField(key, Array.from(e.target.selectedOptions, option => option.value))}
                    >{Choices(x, q).map(x => <option value={x}>{x}</option>)}

                    </Form.Control> :
                    type === 'single' ?
                        Choices(x, q).map((x, index) =>
                            <div className = 'cc-selector-2 col-md-6 col-sm-12 d-flex justify-content-center'>
                                <input
                                    key = {index}
                                    id={index + '_id'}
                                    type='radio'
                                    onChange={e => setField(key, index)}
                                    name={`group${q}`}
                                />
                                <label className={`option-cc ${x.css}`} for={index + '_id'}><h6>{x.label}</h6>
                                </label>
                            </div>) :
                        type === 'range' ?
                            <div className='row px-2'>
                                <Rating
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
                                as='textarea'
                                key={key + '_2'}
                                onChange={e => setField(key, e.target.value)}
                            >
                            </Form.Control>
            }
            </div>
        </Form.Group>

    );
}

function CreateKysely(q, setField) {
    const listItems = kyselyt.map((d) => d.kysymykset);
    const choices = listItems[q];
    const kys = choices.map((d) => d.choices);
    const items = [];
    var i;
    for (i = 0; i < kys.length; i++) {
        items.push(CreateForm(i, q, setField));
    }
    return items;
}


const FormFunctionLanding = (props) => {

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
            kyselyTitle: kyselyt.map((d) => d.kyselyTitle)[id],
            points: kyselyt.map((d) => d.pointCount)[id]
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
    const pointCount = kyselyt.map((d) => d.pointCount)[id]
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    var items = CreateKysely(id, setField)
    const steps = kyselyt.map((d) => d.kysymykset)[id].map((d) => d.choices).length;
    var group = kyselyt.map((d) => d.kysymykset)[id].map((d) => d.group)


    return (
        <form onSubmit={handleSubmit}>
            <h2>{props.title}</h2>

            <MobileStepper
                variant="progress"
                steps={steps}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={activeStep === (steps - 1) ?
                    <div>
                        <Button
                            type="submit"
                            className='btn btn-lg btn-block text-uppercase btn-warning btn-send'
                        >Lähetä</Button>
                        <SignupModalQuestion
                            show={modalShow}
                            onHide={() => { setModalShow(false); window.location = "/home" }}
                            pointCount={pointCount}
                            currentPoints={props.currentPoints}
                            className='signup-modal'
                        />
                    </div>
                    :
                    <Button size="small" onClick={handleNext} >
                        Next
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
            />
            <h4 className='group-name'>{group[activeStep]}</h4>
            <hr className='group-line' />

            {items[activeStep]}

        </form>

    )
};


export default FormFunctionLanding






