/* eslint-disable */
 
import { IoTicket } from 'react-icons/io5';

import React, { Component } from 'react';

class Coupon extends Component {
    render() {
        const couponCount = this.props.couponCount
        const couponType = this.props.couponType
        const size = this.props.size
        
        switch(couponCount){
            case 0:
                switch(couponType){
                    case 'gold':
                        return (
                            <div>
                                <IoTicket
                                className = 'coupon-icon'
                                size={size}
                                color = {'rgba(255, 215, 0, 0.3)'}/>
                                <div className = 'coupon-count'> {couponCount} </div>
                            </div>
                        )
                    case 'silver':
                        return (
                            <div>
                                <IoTicket
                                className = 'coupon-icon'
                                size={size}
                                color = {'rgba(192,192,192, 0.3)'}/>
                                <div className = 'coupon-count'> {couponCount} </div>
                            </div>
                        )
                    case 'bronze':
                        return (
                            <div>
                                <IoTicket
                                className = 'coupon-icon'
                                size={size}
                                color = {'rgba(205, 127, 50, 0.3)'}/>
                                <div className = 'coupon-count'> {couponCount} </div>
                            </div>
                        )
                }
            default:
                switch(couponType){
                    case 'gold':
                        return (
                            <div>
                                <IoTicket
                                className = 'coupon-icon'
                                size={size}
                                color = {'gold'}/>
                                <div className = 'coupon-count'> {couponCount} </div>
                            </div>
                        )
                    case 'silver':
                        return (
                            <div>
                                <IoTicket
                                className = 'coupon-icon'
                                size={size}
                                color = {'#aaa9ad'}/>
                                <div className = 'coupon-count'> {couponCount} </div>
                            </div>
                        )
                    case 'bronze':
                        return (
                            <div>
                                <IoTicket
                                className = 'coupon-icon'
                                size={size}
                                color = {'#cd7f32'}/>
                                <div className = 'coupon-count'> {couponCount} </div>
                            </div>
                        )
                }
                

        }
        
        
    }
}

export default Coupon;