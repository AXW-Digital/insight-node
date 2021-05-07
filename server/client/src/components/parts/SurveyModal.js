import { Modal, Button } from 'react-bootstrap';
import { ActivityCardSmall, PointsCard, LevelCard } from '../../components/cards/ActivityCard'
import { Progress } from 'antd';
import { ProgressBar } from 'react-bootstrap';
import getLevel from '../../functions/getLevel';
import Reward from "react-rewards";
import React from "react";
// Animation
import { easeExpInOut } from "d3-ease";
import AnimatedProgressProvider from "../parts/AnimatedProgressProvider";

const SurveyModal = (props) => {

  const pointText = (pointCount) => {
    if (pointCount < 2) {
      return 'Olet ansainnut yhden pisteen.'
    } else {
      return 'Olet ansainnut ' + pointCount + ' pistettä.'
    }
  }

  const pointsIncrease = props.pointCount
  const levelData = getLevel(props.currentPoints, pointsIncrease)
  const {
    currentPoints,
    level,
    maxLevelPoints,
    levelUp
  } = levelData


  const pointsIncreasePercentage = pointsIncrease / maxLevelPoints * 100
  const pointsStartPercentage = currentPoints / maxLevelPoints * 100

  console.log('current points', currentPoints)



  const renderPointsContent = (
    currentPoints,
    level,
    maxLevelPoints,
    levelUp,
    pointsIncrease,
    pointsStartPercentage,
    pointsIncreasePercentage) => {

    switch (levelUp) {
      case false:
        return (<div>
          <Modal.Body>
            <div className='row'>
              <div className='col d-flex justify-content-center'>
                <PointsCard
                  key={'a3'}
                  boxIcon={'bx bx-bolt-circle bx-flashing points-icon'}
                  count={pointsIncrease}
                  suffix={' p'}
                  color={'green'}
                  shine={'lights'}
                />
              </div>
            </div>
            <br />
            <h5 className='mt-3 modal-heading'>{pointText(pointsIncrease)}</h5>

            <p>
              Vastauksesi on tallennettu onnistuneesti.
              Vastaamalla kyselyihin toimit vaikuttajana ja autat kehittämään yhteistyökumppaneidemme palveluja.
          </p>
            <AnimatedProgressProvider
              valueStart={pointsStartPercentage}
              valueEnd={pointsStartPercentage + pointsIncreasePercentage}
              duration={2.5}
              easingFunction={easeExpInOut}
            >
              {value => {
                const roundedValue = Math.round(value / 100 * maxLevelPoints);
                return (
                  <div>
                    <div className='row'>
                      <div className='col-6'>
                        <p>{`Taso ${level}`}</p>
                      </div>
                      <div className='col-6 d-flex justify-content-end'>
                        <p>{`${currentPoints + pointsIncrease} / ${maxLevelPoints} p`}</p>
                      </div>
                    </div>
                    <ProgressBar
                      animated
                      now={value}
                      striped
                      variant="success"
                    />
                  </div>
                );
              }}

            </AnimatedProgressProvider>

          </Modal.Body>
        </div>

        )
      case true:
        return (
          <Modal.Body>
            <div className='row'>
              <div className='col d-flex justify-content-center'>
                <LevelCard
                  key={'a3'}
                  boxIcon={'bx bxs-medal bx-flashing points-icon'}
                  count={level + 1}
                  suffix={' p'}
                  color={'blue'}
                  shine={'lights-blue'}
                />
              </div>
            </div>
            <br />
            <h5 className='mt-3 modal-heading'>{pointText(pointsIncrease)}</h5>

            <p>
              Vastauksesi on tallennettu onnistuneesti.
              Vastaamalla kyselyihin toimit vaikuttajana ja autat kehittämään yhteistyökumppaneidemme palveluja.
          </p>
            <AnimatedProgressProvider
              valueStart={0}
              valueEnd={pointsIncreasePercentage}
              duration={2.5}
              easingFunction={easeExpInOut}
            >
              {value => {
                const roundedValue = Math.round(value / 100 * maxLevelPoints);
                return (
                  <div>
                    <div className='row'>
                      <div className='col-6'>
                        <p>{`Taso ${level + 1}`}</p>
                      </div>
                      <div className='col-6 d-flex justify-content-end'>
                        <p>{`${currentPoints} / ${maxLevelPoints} p`}</p>
                      </div>
                    </div>
                    <ProgressBar
                      animated
                      now={value}
                      striped
                      variant="success"
                    />
                  </div>
                );
              }}

            </AnimatedProgressProvider>

          </Modal.Body>
        )
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
          Kiitos vastauksista!
          </Modal.Title>
      </Modal.Header>
      {renderPointsContent(
        currentPoints,
        level,
        maxLevelPoints,
        levelUp,
        pointsIncrease,
        pointsStartPercentage,
        pointsIncreasePercentage)}
      <Modal.Footer
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={props.onHide}
          centered
          className='text-uppercase'
          variant='warning'
          size='lg'
          block
        >
          Jatka
        </Button>


      </Modal.Footer>
    </Modal>
  );
}

export default SurveyModal



const SignupModal = (props) => {

  const pointText = (pointCount) => {
    if (pointCount < 2) {
      return 'Olet ansainnut ensimmäisen pisteesi.'
    } else {
      return 'Olet ansainnut ensimmäiset ' + pointCount + ' pistettä.'
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
          Kiitos rekisteröitymisestä ja tervetuloa vaikuttajien joukkoon.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{pointText(props.pointCount)} Mahtavaa!</h4>
        <p>
          Profiilisi on tallennettu onnistuneesti.
          Vastaamalla kyselyihin toimit vaikuttajana ja autat kehittämään yhteistyökumppaneidemme palveluja.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Jatka</Button>
      </Modal.Footer>
    </Modal>
  );
}

export { SignupModal }
