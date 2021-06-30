import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Wheel } from 'react-custom-roulette';



const RouletteWheel = forwardRef((props, ref)  => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);  

  useImperativeHandle(ref, () => ({

    handleSpinClick(){
      const newPrizeNumber = Math.floor(Math.random() * props.data.length)
      setPrizeNumber(newPrizeNumber)
      setMustSpin(true)
      
    }

    

  }));

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        {...props}
        outerBorderColor={'lightgray'}
        radiusLineColor={'white'}
        outerBorderWidth = {20}
        fontSize={16}
        innerRadius={20}


        onStopSpinning={() => {
          setMustSpin(false)
        }}
      />
      
    </>
  )
})

export default RouletteWheel