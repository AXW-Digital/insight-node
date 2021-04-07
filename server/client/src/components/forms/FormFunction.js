import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import kyselyt from '../../assets/js/kyselyt'
import { SliderReview } from '../parts/RangeSlider'

function Choices(n, q) {
    const listItems = kyselyt.map((d) => d.kysymykset);
    const choices = listItems[q];
    const kys = choices.map((d) => d.choices);
    return kys[n];
}

function CreateForm(x, q) {
    var choices = kyselyt.map((d) => d.kysymykset)[q]
    var type = choices.map((d) => d.type)[x]
    var group = choices.map((d) => d.group)
    var min = choices.map((d) => d.min)[x]
    var max = choices.map((d) => d.max)[x]
    var key = choices.map((d) => d.num)[x]
    var new_group = false
    var draw_line = false
    if (x === 0 || group[x] !== group[x-1]){new_group = true} else { new_group = false}
    if (x !== 0 && new_group === true){draw_line = true} else { draw_line = false}

    return (        
        
        <Form.Group key = {key}>
        { draw_line ? <hr className = 'group-line' />: null}
        { new_group ? <h4 className = 'group-name'>{group[x]}</h4>: null}
            <Form.Label key = {key + '_1'}>{kyselyt.map((d) => d.kysymykset)[q].map((y) => y.title)[x]}</Form.Label>
            {
                type === 'multi' ?  <Form.Control key = {key + '_2'} as='select' multiple htmlSize={Choices(x, q).length}>{Choices(x, q).map(x => <option>{x}</option>)}</Form.Control> :
                type === 'single' ? <Form.Control key = {key + '_2'} as='select' >{Choices(x, q).map(x => <option>{x}</option>)}</Form.Control> :
                type === 'range' ? <SliderReview key = {key + '_2'} min = {min} max = {max} />:
                <Form.Control as='textarea' key = {key + '_2'} ></Form.Control>
            }
        </Form.Group>

    );
}

function CreateKysely(q) {
    const listItems = kyselyt.map((d) => d.kysymykset);
    const choices = listItems[q];
    const kys = choices.map((d) => d.choices);
    const items = [];
    var i;
    for (i = 0; i < kys.length; i++) {
        items.push(CreateForm(i, q));
    }
    return items;
}


export default class FormFunction extends Component {
    render() {
        return (
            <div>
                {CreateKysely(this.props.question)}
            </div>
        )
    }
}







