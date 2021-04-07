import React from 'react'
import RangeSlider from 'react-bootstrap-range-slider';
import { Form, Col, Row } from 'react-bootstrap'


const SliderDist = () => {

    const [value, setValue] = React.useState(50);

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
                        onChange={e => setValue(e.target.value)}
                        step={10}
                        min={20}
                        max={300}
                        variant='warning'
                        tooltipPlacement='bottom'
                        tooltip='auto'
                    />
                </Col>
                <Col xs="5" md='2'>
                    <Form.Control value={value + ` km`} className='range-dist' />
                </Col>
            </Form.Group>
        </Form>
    );
};

export { SliderDist }


const SliderPrice = () => {

    const [value, setValue] = React.useState(15);

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
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        step={2.5}
                        min={5}
                        max={50}
                        variant='warning'
                        tooltipPlacement='bottom'
                        tooltip='auto'
                    />
                </Col>
                <Col xs="5" md='2'>
                    <Form.Control value={value + ` €`} className='range-dist' />
                </Col>
            </Form.Group>
        </Form>
    );
};

export { SliderPrice }





const SliderReview = (props) => {

    const [value, setValue] = React.useState(3);

    return (
        <Form.Group as={Row}>
            <Col xs="9" md='11'>
                <RangeSlider
                    value={value}
                    onChange={e => setValue(e.target.value)}
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
                <Form.Control value={value} />
            </Col>
        </Form.Group>


    );
};

export { SliderReview }