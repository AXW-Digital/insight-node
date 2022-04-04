import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export const IdleTimeOutModal = ({ showModal, handleClose, handleLogout, remainingTime }) => {

    const [seconds, setSeconds] = useState(remainingTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    const timeLeft = {
        minutes: Math.floor((seconds / (60 * 1000)) % 60),
        seconds: Math.floor((seconds) % 60)
    };

    return (
        <Modal show={showModal} onHide={handleClose}  className = 'idle-modal'>
            
                <Stack spacing={2}>
                    <Alert
                        severity="info"
                        sx={{ mb: 2 }}
                        style={{margin: 0}}
                    >
                        <AlertTitle><strong>Huom</strong></AlertTitle>
                        Hei! Olet ollut kauan inaktiivinen. Haluatko jatkaa? 


                        <div className = 'row mr-auto mt-3'>
                            <div className = 'mr-2 ml-2'>
                                    <Button
                                        variant='contained'
                                        size="medium"
                                        onClick={handleClose}
                                    >
                                        JATKA
                                    </Button>
                                    
                            </div>  
                            <div className = 'mr-2'>
                                    <Button
                                        variant='contained'
                                        size="medium"
                                        onClick={handleLogout}
                                    >
                                        KIRJAUDU ULOS
                                    </Button>
                                    </div>         

                        </div>
                    </Alert>
                </Stack>




                {/* <Modal.Header closeButton>
            <Modal.Title>You Have Been Idle!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Hei! Olet ollut kauan inaktiivinen. Sinut kirjataan automaattisesti hetken kuluttua: {timeLeft.minutes} : {timeLeft.seconds}  </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleLogout}>
                Logout
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Stay
            </Button>
            </Modal.Footer> */}
            
        </Modal>

    )
}