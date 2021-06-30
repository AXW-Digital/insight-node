import React, { useState, useRef } from 'react';
import ActivityCard from './ActivityCard';
import { Modal, Button } from 'react-bootstrap';
import RouletteWheel from '../parts/RouletteWheel';
import Loader from '../parts/Loader';
import randomMC from "random-material-color";





function RouletteModal(props) {
    const [show, setShow] = useState(false);

    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    

    const RenderRoulette = () => {
        const childRef = useRef();

        function getColor(){
            var color = randomMC.getColor();
            return color
          }

        var options = [
            { option: 'Casa Italia',  style: { backgroundColor: 'green', textColor: 'black' } },
            { option: 'SOK Lahjakortti' ,  style: { backgroundColor: 'green', textColor: 'black' }},
            { option: 'Happy Waffle' ,  style: { backgroundColor: 'green', textColor: 'black' }},
            { option: 'Moko Market',  style: { backgroundColor: 'green', textColor: 'black' } },
            { option: `Manhattan Steakhouse`,  style: { backgroundColor: 'green', textColor: 'black' } },
            { option: 'Taco Salaatti',  style: { backgroundColor: 'green', textColor: 'black' } }
          ]
        
        const data = options.map(x => ({ option: x.option, style: {backgroundColor: getColor(), textColor: 'white'} }))

        return (
            <div className='row d-flex'>
                <div className='col-12 d-flex justify-content-center'>
                <i className='bx bxs-coupon roulette-coupon'></i> 
                <RouletteWheel ref={childRef} data={data}/>
                </div> 
                <div className='col-12 d-flex justify-content-center'>
                <Button onClick={() => childRef.current.handleSpinClick()}>PYÖRÄYTÄ</Button>
                </div>
                               
            </div>
        )
    }

    

    return (
        <>

            <ActivityCard
                key={"a4"}
                boxIcon={"bx bxs-coupon"}
                count={props.count}
                cardText={"Kupongit yhteensä"}
                suffix={""}
                color={"blue"}
                shine={"glowing"}
                showModal={handleShow}                

            >
            </ActivityCard>

            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Pyöräytä arvontapyörää!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
             {RenderRoulette()}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default RouletteModal;



