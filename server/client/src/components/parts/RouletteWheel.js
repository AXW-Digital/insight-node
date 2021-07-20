import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Wheel } from 'react-custom-roulette';
import storeReducer from '../../reducers/storeReducer';
import { configureStore } from '@reduxjs/toolkit';
import { prizeService } from '../../functions/prizeNumberGen';







const RouletteWheel = forwardRef((props, ref)  => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const store = configureStore({ reducer: storeReducer })  

  useImperativeHandle(ref, () => ({
    
    handleSpinClick(){

      const newPrizeNumber = Math.floor(Math.random() * props.data.length)
      prizeService.sendNumber(newPrizeNumber)      
      setPrizeNumber(newPrizeNumber)
      setMustSpin(true)
      // store.dispatch({type : 'prizenum', payload : newPrizeNumber })   //TODO: can't fucking get reducer to work, then make an axios post and own little table with useid and prizenum?? 
      
      


    }

  }));

  return (
    <>
    <div className = 'roulette-wheel'>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        {...props}
        outerBorderColor={'lightgray'}
        radiusLineColor={'white'}
        outerBorderWidth = {20}
        fontSize={16}
        innerRadius={20}
        onStopSpinning={props.win}
      />
      </div>
      
    </>
  )
})



export default RouletteWheel;
