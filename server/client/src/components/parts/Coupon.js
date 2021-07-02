
import { IoTicket } from 'react-icons/io5';

import React, { Component } from 'react';

class Coupon extends Component {
    render() {
        const couponCount = this.props.couponCount
        const couponType = this.props.couponType
        const size = this.props.size
        
        switch(couponCount){
            case 0:
                return (
                    <div>
                        <IoTicket 
                        size={size} 
                        color={'#ededee'}/>
                        <h5 className = 'coupon-count'> {couponCount} </h5>
                    </div>
                );
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