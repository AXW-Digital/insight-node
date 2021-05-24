import { Modal, Button } from 'react-bootstrap';
import Reward from "react-rewards";
import React from "react";
import Countdown from "react-countdown";
import { BiTimer, BiCalendarCheck } from 'react-icons/bi';


const VoucherModal = (props) => {

    // Expiry component
    const Completionist = () => <span>Ei voimassa!</span>;
    const [modalShow, setModalShow] = React.useState(false);

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <Completionist />;
        } else {
            // Render a countdown
            switch(days){
                default:
                    return (
                        <span>
                            &nbsp; {days} päivää +
                        </span>
                    );
                case 0:
                    return (
                        <span>
                            {hours}:{minutes}:{seconds}
                        </span>
                    );
                case 1:
                    return (
                        <span>
                            Huomiseen asti
                        </span>
                    );

            }
            
        }
    };


    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            id = 'voucher-modal'
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.formTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className=' d-flex row justify-content-center'>
                    <img
                        src={props.picUrl}
                        className='voucher-image'
                    ></img>
                </div>
                <div className='row d-flex'>
                    <div className='col-6 d-flex justify-content-center align-items-center voucher-benefit-box'>
                        {props.benefit}
                    </div>
                    <div className='col-6 d-flex justify-content-center align-items-center voucher-benefit-type'>
                        {props.benefitType}
                    </div>
                </div>
                <h4 className = 'mt-4'> {props.formText}</h4>
                <p className = 'mt-4'>
                    {props.description}
                    <br/>
                    <br/>
                    <BiCalendarCheck 
                    size='1.5rem'
                    /> &nbsp; Voimassa: {Intl.DateTimeFormat('fi').format(props.dateStart + props.valid)}
                </p>
                <hr className = 'row d-flex' />
                <p className = 'mt-4'>
                    <BiTimer
                    size = '1.5em'/>
                    <Countdown date={props.dateStart + props.valid} renderer={renderer} />
                </p>
            </Modal.Body>

            <Modal.Footer
                style={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Button
                    onClick={props.onHide}
                    centered
                    className='text-uppercase voucher-modal-activate'
                    size='lg'
                    block
                    style={{
                        zIndex: 999
                    }}
                >
                    AKTIVOI
        </Button>


            </Modal.Footer>
        </Modal>
    );
}

export default VoucherModal


