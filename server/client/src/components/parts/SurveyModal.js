import { Modal, Button } from 'react-bootstrap';

const SurveyModal = (props) => {
    
    const couponText = (couponCount) => {
        if (couponCount < 2){
            return 'Olet ansainnut yhden kupongin.'
        } else {
            return 'Olet ansainnut ' + couponCount + ' kuponkia.'
        }        
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Kiitos vastauksista! Olet vaikuttaja
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{couponText(props.couponCount)} Mahtavaa!</h4>
          <p>
            Vastauksesi on tallennettu onnistuneesti.             
            Vastaamalla kyselyihin toimit vaikuttajana ja autat kehittämään yhteistyökumppaneidemme palveluja. 
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Sulje</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default SurveyModal