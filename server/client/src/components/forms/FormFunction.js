import React, { Component, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import kyselyt from '../../assets/js/kyselyt';
import { SliderReview } from '../parts/RangeSlider';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';





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

        <Form.Group key={key} controlId={key}>
            { draw_line ? <hr className='group-line' /> : null}
            { new_group ? <h4 className='group-name'>{group[x]}</h4> : null}
            <Form.Label key={key + '_1'}>{kyselyt.map((d) => d.kysymykset)[q].map((y) => y.title)[x]}</Form.Label>
            {
                type === 'multi' ?
                    <Form.Control
                        key={key + '_2'}
                        as='select'
                        multiple htmlSize={Choices(x, q).length}
                        onChange={ e => setField(key, Array.from(e.target.selectedOptions, option => option.value)) }
                        >{Choices(x, q).map(x => <option value= {x}>{x}</option>)}
                        
                    </Form.Control> :
                type === 'single' ?
                    <Form.Control
                        key={key + '_2'}
                        as='select'
                        onChange={ e => setField(key, e.target.value) }
                        >
                        <option className = 'text-muted' value='' disabled selected>Valitse yksi:</option>
                        {Choices(x, q).map(x => <option value= {x}>{x}</option>)}
                    </Form.Control> :
                type === 'range' ?
                    <div className = 'row px-2'>
                    <Rating 
                        defaultValue={0} 
                        key={key + '_2'}
                        max={max}
                        size="large"
                        onChange={ e => setField(key, e.target.value)} 
                    />
                    </div>
                :
                    <Form.Control 
                        as='textarea' 
                        key={key + '_2'}
                        onChange={ e => setField(key, e.target.value) } 
                        >
                    </Form.Control>
            }
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


const FormFunction = (props) => {

    const [form, setForm] = useState({})

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }
    console.log(form)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(form)
        
        axios.post('/api/surveys', { form })
            .then(res => {
            console.log(res);
            console.log(res.data);
        })
      };
        
        return (
                <form onSubmit={handleSubmit}>
                {CreateKysely(props.question, setField)}
                <Button type="submit">Submit form</Button>
                </form>

        )
};


export default FormFunction






