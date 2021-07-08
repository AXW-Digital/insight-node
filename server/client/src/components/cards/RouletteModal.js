import React, { useState, useRef } from 'react';
import ActivityCard from './ActivityCard';
import { Modal, Button } from 'react-bootstrap';
import RouletteWheel from '../parts/RouletteWheel';
import Loader from '../parts/Loader';
import randomMC from "random-material-color";
import Coupon from '../parts/Coupon';
import RouletteWinModal from '../parts/RouletteWinModal';





function RouletteModal(props) {
    const [showBronze, setBronzeShow] = useState(false);
    const [showSilver, setSilverShow] = useState(false);
    const [showGold, setGoldShow] = useState(false);
    const [showWin, setWinShow] = useState(false);
    const [spin, setSpin] = useState(false)
    var couponType = null

    
    const handleBronzeShow = () => setBronzeShow(true);
    const handleSilverShow = () => setSilverShow(true);
    const handleGoldShow = () => setGoldShow(true);
    const handleWin = () => setWinShow(true); showBronze ? couponType='bronze' : showSilver ? couponType='silver' : couponType='gold'
    const handleClose = () => {setBronzeShow(false); setSilverShow(false); setGoldShow(false); ; setWinShow(false)} 
    
    function handleSpin(){
        setSpin(true);
    }
    

    const RenderBronzeRoulette = () => {
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
                <div className = 'roulette-coupon' >
                    <Coupon size={'75%'} couponType={'bronze'} />
                    </div>
                <RouletteWheel ref={childRef} data={data} win={handleWin}/>
                </div> 
                <div className='col-12 d-flex justify-content-center mt-3'>
                <Button onClick={() => {childRef.current.handleSpinClick(); handleSpin()}} className='glowing-button'>PYÖRÄYTÄ</Button>
                </div>
                               
            </div>
        )
    }

    const RenderSilverRoulette = () => {
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
                <div className = 'roulette-coupon' >
                    <Coupon size={'75%'} couponType={'silver'} />
                    </div>
                <RouletteWheel ref={childRef} data={data} win={handleWin}/>
                </div> 
                <div className='col-12 d-flex justify-content-center mt-3'>
                <Button onClick={() => {childRef.current.handleSpinClick(); handleSpin()}} className='glowing-button'>PYÖRÄYTÄ</Button>
                </div>
                               
            </div>
        )
    }


    const RenderGoldRoulette = () => {
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
                    <div className = 'roulette-coupon' >
                    <Coupon size={'75%'} couponType={'gold'} />
                    </div>
                <RouletteWheel ref={childRef} data={data} win={handleWin}/>
                </div> 
                <div className='col-12 d-flex justify-content-center mt-3'>
                <Button onClick={() => {childRef.current.handleSpinClick(); handleSpin()}} className='glowing-button'>PYÖRÄYTÄ</Button>
                </div>
                               
            </div>
        )
    }

    

    return (
        <>
            {/* Roulette Modals */}
            <ActivityCard                
                shine={"glowing"}
                bronzeClick={handleBronzeShow}
                silverClick={handleSilverShow}
                goldClick={handleGoldShow}
                bronzeCount={0}
                silverCount={1}
                goldCount={1}                

            >
            </ActivityCard>

            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showBronze}
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Pyöräytä arvontapyörää!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
             {RenderBronzeRoulette()}
            </Modal.Body>
            <Modal.Footer>
                {spin? null : <Button onClick={handleClose}>Close</Button>}                
            </Modal.Footer>
        </Modal>

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showSilver}
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Pyöräytä arvontapyörää!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
             {RenderSilverRoulette()}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showGold}
            className={'roulette-modal'}
            
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Pyöräytä arvontapyörää!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
             {RenderGoldRoulette()}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>

        {/* end Roulette Modals */}

        {/* prize Voucher Modal */}
        <RouletteWinModal
        show={showWin}
        handleClick={handleWin}
        handleClose={handleClose}
        couponType={couponType}
        voucherFilter={16}
        />
        
    </>
    );
}

export default RouletteModal;



