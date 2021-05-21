import { Modal, Button } from 'react-bootstrap';
import Reward from "react-rewards";
import React from "react";
import CardMedia from '@material-ui/core/CardMedia';

const VoucherModal = (props) => {

 
  return (
    <Modal 
      {...props}      
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Kiitos vastauksista!
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <CardMedia
                        className={props.media}
                        image={props.picUrl}
                        title={props.formTitle}
        />
        <h4> Lahjakortti </h4>
        <p>
          Lahjakortin tarkempi sisältö
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
          className='text-uppercase'
          variant='warning'
          size='lg'
          block
          style={{
            zIndex: 999
          }}
        >
          Jatka
        </Button>


      </Modal.Footer>
    </Modal>
  );
}

export default VoucherModal


