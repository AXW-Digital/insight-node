import React, { useState, useRef, useEffect } from 'react';
import ActivityCard from './ActivityCard';
import { Modal, Button } from 'react-bootstrap';
import RouletteWheel from '../parts/RouletteWheel';
import Loader from '../parts/Loader';
import randomMC from "random-material-color";
import Coupon from '../parts/Coupon';
import RouletteWinModal from '../parts/RouletteWinModal';
import { connect } from 'react-redux';
import axios from 'axios';
import keys from '../../config/keys';
import { refresh } from 'aos';




function RouletteModal(props) {

   

    const [bronzeData, setRouletteObjectsBronze] = useState(null);
    const [silverData, setRouletteObjectsSilver] = useState(null);
    const [goldData, setRouletteObjectsGold] = useState(null);

    function getColor() {
        var color = randomMC.getColor();
        return color
    }

    useEffect(() => {
        axios.get(keys.adminUrl + '/api/rouletteitems').then((res) => {
            setRouletteObjectsBronze(
                res.data.filter(x => x.couponType === 'bronze').map(x => ({ voucherId: x.voucherId, option: x.name, style: { backgroundColor: getColor(), textColor: 'white' } }))
            )
            setRouletteObjectsSilver(
                res.data.filter(x => x.couponType === 'silver').map(x => ({ voucherId: x.voucherId, option: x.name, style: { backgroundColor: getColor(), textColor: 'white' } }))
            )
            setRouletteObjectsGold(
                res.data.filter(x => x.couponType === 'gold').map(x => ({ voucherId: x.voucherId, option: x.name, style: { backgroundColor: getColor(), textColor: 'white' } }))
            )
        })
    }, []);


    const [showBronze, setBronzeShow] = useState(false);
    const [showSilver, setSilverShow] = useState(false);
    const [showGold, setGoldShow] = useState(false);
    const [showWin, setWinShow] = useState(false);
    const [spin, setSpin] = useState(false);
    const [prizeNum, setPrizeNum] = useState(null); 

    var couponType = null


    const handleBronzeShow = () => setBronzeShow(true);
    const handleSilverShow = () => setSilverShow(true);
    const handleGoldShow = () => setGoldShow(true);
    const handleWin = () => setWinShow(true); showBronze ? couponType = 'bronze' : showSilver ? couponType = 'silver' : couponType = 'gold'
    const handleClose = () => { setBronzeShow(false); setSilverShow(false); setGoldShow(false);; setWinShow(false) }
    
    const btnRefBronze = useRef();
    const btnRefGold= useRef();
    const btnRefSilver = useRef();
    const btnRef = useRef();

    function handleSpin() {
        if(btnRef.current){
            btnRef.current.setAttribute('disabled', 'disabled');
        }
        if(btnRefBronze.current){
            btnRefBronze.current.setAttribute('disabled', 'disabled');
        }
        if(btnRefSilver.current){
            btnRefSilver.current.setAttribute('disabled', 'disabled');
        }
        if(btnRefGold.current){
            btnRefGold.current.setAttribute('disabled', 'disabled');
        }
        setSpin(true);
    }




    const RenderBronzeRoulette = () => {
        const childRef = useRef();

        function getColor() {
            var color = randomMC.getColor();
            return color
        }




        

        return (
            <div className='row d-flex'>
                <div className='col-12 d-flex justify-content-center'>
                    <div className='roulette-coupon' >
                        <Coupon size={'75%'} couponType={'bronze'} />
                    </div>
                    <RouletteWheel ref={childRef} data={bronzeData} win={handleWin} user={props.data.profile._user} couponType={'bronze'} />
                </div>
                <div className='col-12 d-flex justify-content-center mt-3'>
                    <Button onClick={() => { childRef.current.handleSpinClick(); handleSpin() }} className='glowing-button' ref={btnRefBronze}>PYÖRÄYTÄ</Button>
                </div>

            </div>
        )
    }

    const RenderSilverRoulette = () => {
        const childRef = useRef();
        
        

        function getColor() {
            var color = randomMC.getColor();
            return color
        }

        

        // if (rouletteObjects !== null) {
        //     var data = rouletteObjects.map(x => ({ option: x.name, style: { backgroundColor: getColor(), textColor: 'white' } }))
        //     data = data.filter(x => x.couponType === 'silver')
        // }

        return (
            <div className='row d-flex'>
                <div className='col-12 d-flex justify-content-center'>
                    <div className='roulette-coupon' >
                        <Coupon size={'75%'} couponType={'silver'} />
                    </div>
                    <RouletteWheel ref={childRef} data={silverData} win={handleWin} user={props.data.profile._user} couponType={'silver'}/>
                </div>
                <div className='col-12 d-flex justify-content-center mt-3'>
                    <Button onClick={() => { childRef.current.handleSpinClick(); handleSpin() }} className='glowing-button' ref={btnRefSilver}>PYÖRÄYTÄ</Button>
                </div>

            </div>
        )
    }


    const RenderGoldRoulette = () => {
        const childRef = useRef();

        function getColor() {
            var color = randomMC.getColor();
            return color
        }

        // if (rouletteObjects !== null) {
        //     var data = rouletteObjects.map(x => ({ option: x.name, style: { backgroundColor: getColor(), textColor: 'white' } }))
        //     data = data.filter(x => x.couponType === 'gold')
        // }

        return (
            <div className='row d-flex'>
                <div className='col-12 d-flex justify-content-center'>
                    <div className='roulette-coupon' >
                        <Coupon size={'75%'} couponType={'gold'} />
                    </div>
                    <RouletteWheel ref={childRef} data={goldData} win={handleWin} user={props.data.profile._user} couponType={'gold'}/>
                </div>
                <div className='col-12 d-flex justify-content-center mt-3'>
                    <Button onClick={() => { childRef.current.handleSpinClick(); handleSpin() }} className='glowing-button' ref={btnRefGold}>PYÖRÄYTÄ</Button>
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
                    {spin ? null : <Button onClick={handleClose}>Close</Button>}
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
                {spin ? null : <Button onClick={handleClose}>Close</Button>}
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
                {spin ? null : <Button onClick={handleClose}>Close</Button>}
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
                prizeNum={prizeNum}
                vouchers = {props.vouchers}
            />

        </>
    );
}

function mapStateToProps(data) {
    return { data };
}

export default connect(mapStateToProps)(RouletteModal);



