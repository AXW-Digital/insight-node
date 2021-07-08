
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
                                <h5 className = 'coupon-count'> {couponCount} </h5>
                            </div>
                        )
                    case 'silver':
                        return (
                            <div>
                                <IoTicket
                                className = 'coupon-icon'
                                size={size}
                                color = {'rgba(192,192,192, 0.3)'}/>
                                <h5 className = 'coupon-count'> {couponCount} </h5>
                            </div>
                        )
                    case 'bronze':
                        return (
                            <div>
                                <IoTicket
                                className = 'coupon-icon'
                                size={size}
                                color = {'rgba(205, 127, 50, 0.3)'}/>
                                <h5 className = 'coupon-count'> {couponCount} </h5>
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
                                <h5 className = 'coupon-count'> {couponCount} </h5>
                            </div>
                        )
                    case 'silver':
                        return (
                            <div>
                                <IoTicket
                                className = 'coupon-icon'
                                size={size}
                                color = {'#aaa9ad'}/>
                                <h5 className = 'coupon-count'> {couponCount} </h5>
                            </div>
                        )
                    case 'bronze':
                        return (
                            <div>
                                <IoTicket
                                className = 'coupon-icon'
                                size={size}
                                color = {'#cd7f32'}/>
                                <h5 className = 'coupon-count'> {couponCount} </h5>
                            </div>
                        )
                }
                

        }
        
        
    }
}

export default Coupon;