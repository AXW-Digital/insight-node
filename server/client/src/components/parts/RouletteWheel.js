/* eslint-disable */
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Wheel } from 'react-custom-roulette';
import storeReducer from '../../reducers/storeReducer';
import { configureStore } from '@reduxjs/toolkit';
import { prizeService } from '../../functions/prizeNumberGen';
import { couponService } from '../../functions/couponReduce';
import { first } from 'rxjs/operators'
import { changeConfirmLocale } from 'antd/lib/modal/locale';
import weightedRandom from '../../functions/weightedRandom';









const RouletteWheel = forwardRef((props, ref) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const store = configureStore({ reducer: storeReducer })
  const data = props.data

  useImperativeHandle(ref, () => ({

    handleSpinClick() {

      const options = [...Array(data.length).keys()];
      const probs = data.map(x => x.prob)
      const newPrizeNumber = weightedRandom(options, probs)
      // const newPrizeNumber = Math.floor(Math.random() * props.data.length)
      prizeService.sendNumber(data[newPrizeNumber.index].voucherId)
      setPrizeNumber(newPrizeNumber)
      setMustSpin(true)

    }

  }));

  const subscription = prizeService.onNumber().subscribe(number => {
    if (number) {
      // console.log('prize service activated')
      reduceCoupons();
    } else {      
    }

  })



  const reduceCoupons = async () => {

    const userId = props.user

    var bronzeCoupons, silverCoupons, goldCoupons
    bronzeCoupons = silverCoupons = goldCoupons = 0
    switch (props.couponType) {
      case 'bronze':
        bronzeCoupons = -1
        break
      case 'silver':
        silverCoupons = -1
        break
      case 'gold':
        goldCoupons = -1
        break
      default:
        bronzeCoupons = silverCoupons = goldCoupons = 0
        break
    }



    var coupons = { userId, bronzeCoupons, silverCoupons, goldCoupons }

    // console.log(console.log('reducing coupons: ', coupons))

    await couponService.sendCoupon(coupons)

    
  }

 



  return (
    <>
      <div className='roulette-wheel'>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          {...props}
          outerBorderColor={'lightgray'}
          radiusLineColor={'white'}
          outerBorderWidth={20}
          fontSize={16}
          innerRadius={20}
          onStopSpinning={props.win}
        />
      </div>

    </>
  )
})



export default RouletteWheel;
