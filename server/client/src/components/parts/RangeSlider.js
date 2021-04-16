import React from 'react'
import RangeSlider from 'react-bootstrap-range-slider';
import { Form, Col, Row } from 'react-bootstrap';
import { dataService } from '../cards/SettingsCard';


const SliderDist = (props) => {

    const [value, setValue] = React.useState(props.maxdist);

    return (
        <Form>
            <Form.Label>
                <p>
                    Maksimietäisyys
                </p>
            </Form.Label>
            <Form.Group as={Row}>
                <Col xs="7" md='10'>
                    <RangeSlider
                        value={value}
                        onChange={e => {setValue(e.target.value); dataService.setData({'maxdist': e.target.value})}}
                        step={10}
                        min={20}
                        max={300}
                        variant='warning'
                        tooltipPlacement='bottom'
                        tooltip='auto'
                    />
                </Col>
                <Col xs="5" md='2'>
                    <Form.Control
                    type='text'
                    value={value + ` km`} 
                    className='range-dist' 
                    readOnly={true}
                    />
                </Col>
            </Form.Group>
        </Form>
    );
};

export { SliderDist }


const SliderPrice = (props) => {

    const [value, setValue] = React.useState(props.maxprice);

    return (
        <Form>
            <Form.Label>
                <p>
                    Annosten maksimihinta
                </p>
            </Form.Label>
            <Form.Group as={Row}>
                <Col xs="7" md='10'>
                    <RangeSlider
                        defaultValue={props.maxprice}
                        value={value}
                        onChange={e => {setValue(e.target.value); dataService.setData({'maxprice': e.target.value})}}
                        step={2.5}
                        min={5}
                        max={50}
                        variant='warning'
                        tooltipPlacement='bottom'
                        tooltip='auto'
                    />
                </Col>
                <Col xs="5" md='2'>
                    <Form.Control
                    type='text'
                    value={value + ` €`} 
                    className='range-dist' 
                    readOnly={true}
                    />
                </Col>
            </Form.Group>
        </Form>
    );
};

export { SliderPrice }





const SliderReview = (props) => {

    const [value, setValue] = React.useState(3);

    const [form, setForm] = React.useState({})

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    return (
        <Form.Group as={Row}>
            <Col xs="9" md='11'>
                <RangeSlider
                    value={value}
                    onChange={e => {setValue(e.target.value); setField(props.key, props.value)}}
                    step={1}
                    min={props.min}
                    max={props.max}
                    variant='warning'
                    tooltipPlacement='bottom'
                    tooltip='auto'
                    size='lg'
                />
            </Col>
            <Col xs="3" md='1'>
                <Form.Control value={value} name={props.name} />
            </Col>
        </Form.Group>


    );
};

export { SliderReview }