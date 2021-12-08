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

const useStyles = makeStyles({
    root: {
        maxWidth: 1500,
        flexGrow: 2,
    },
});


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
                        key={key + '_2'}
                        as='select'
                        multiple htmlSize={Choices(x, kyselyt).length}
                        onChange={e => setField(key, Array.from(e.target.selectedOptions, option => option.value))}
                    >{Choices(x, kyselyt).map(x => <option value={x}>{x}</option>)}

                    </Form.Control> :
                    type === 'single' ?
                        <Form.Control
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
    const pointCount = kyselyt.map((d) => d.pointCount)[0]
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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


    return (
        <form onSubmit={handleSubmit}> 
        <h2>{props.title}</h2> 
                                        
            <MobileStepper
                variant="progress"
                steps={steps}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === steps-1}>
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
            className = 'btn btn-lg btn-block text-uppercase btn-warning btn-send'
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
            
        </form>

    )
};


export default FormFunction






