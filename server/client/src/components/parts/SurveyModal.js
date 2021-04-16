import { Modal, Button } from 'react-bootstrap';

const SurveyModal = (props) => {
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Kiitos vastauksista!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Olet vaikuttaja</h4>
          <p>
            Vastauksesi on tallennettu onnistuneesti.
            Olet ansainnut {props.couponCount} lisäkuponkia. Mahtavaa! 
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