/* eslint-disable */
 
import React, { Component } from 'react';
import CountUp from 'react-countup';
import Reward from "react-rewards";
import Coupon from '../parts/Coupon';
import { connect } from 'react-redux';
import Loader from '../parts/Loader';

class ActivityCard extends Component {

    render() {
        if (this.props.data.coupons !== null) {
            var { bronzeCoupons, silverCoupons, goldCoupons } = this.props.data.coupons
            const couponSum = bronzeCoupons + silverCoupons + goldCoupons
            var shine = ''
            couponSum > 0 ? shine = 'glowing' : shine = ''
        }

        switch (this.props.data.coupons) {
            case null: <Loader />
            default:

                return (

                            
                                <div className='d-flex justify-content-center align-items-center coupon-box'>
                                    {bronzeCoupons > 0 ?
                                        <div onClick={this.props.bronzeClick}>
                                            <div className = 'coupon-div col-4'>
                                            <Coupon
                                                size={100}
                                                couponCount={bronzeCoupons}
                                                couponType={'bronze'}
                                            />
                                            </div>
                                        </div>
                                        :
                                        <div className = 'coupon-div col-4'>
                                        <Coupon
                                            size={100}
                                            couponCount={bronzeCoupons}
                                            couponType={'bronze'}
                                        />
                                        </div>
                                    }
                                    {silverCoupons > 0 ?
                                        <div onClick={this.props.silverClick}>
                                            <div className = 'coupon-div col-4'>
                                            <Coupon
                                                size={100}
                                                couponCount={silverCoupons}
                                                couponType={'silver'}
                                            />
                                            </div>
                                        </div>
                                        :
                                        <div className = 'coupon-div col-4'>
                                        <Coupon
                                            size={100}
                                            couponCount={silverCoupons}
                                            couponType={'silver'}
                                        />
                                        </div>
                                    }
                                    {goldCoupons > 0 ?
                                        <div onClick={this.props.goldClick}>
                                            <div className = 'coupon-div col-4'>
                                            <Coupon
                                                size={100}
                                                couponCount={goldCoupons}
                                                couponType={'gold'}
                                            />
                                            </div>
                                        </div>
                                        :
                                        <div className = 'coupon-div col-4'>
                                        <Coupon
                                            size={100}
                                            couponCount={goldCoupons}
                                            couponType={'gold'}
                                        />
                                        </div>
                                    }
                                </div>
                            

                );
        }
    }
}

function mapStateToProps(data) {
    return { data };
}

export default connect(mapStateToProps)(ActivityCard);

class ActivityCardSmall extends Component {
    render() {
        return (
            <div className={`col-xl-2 col-lg-6 align-self-stretch justify-content-between d-flex clearfix mt-2 mt-lg-0 ${this.props.shine}`}>
                <div className="count-box-small d-flex align-items-center justify-content-center" style={{ color: `${this.props.color}` }}>
                    <i className={`${this.props.boxIcon}`}></i>
                    <div>
                        <CountUp end={this.props.count} duration={4} delay={0.3} suffix={this.props.suffix} />
                        <p style={{ color: 'gray' }}>{this.props.cardText}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export { ActivityCardSmall };

class PointsCard extends Component {
    render() {
        return (
            <div className={`col-lg-6 align-self-stretch justify-content-between d-flex clearfix mt-2 mt-lg-0 ${this.props.shine}`}>
                <div className="count-box-small d-flex align-items-center justify-content-end" style={{ color: `${this.props.color}` }}>
                    <i className={`${this.props.boxIcon}`}></i>
                    <div>
                        <CountUp end={this.props.count} duration={2} delay={0.3} />
                        <p style={{ color: 'gray' }}>{this.props.cardText}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export { PointsCard };

class LevelCard extends Component {
    constructor(props) {
        super(props);

        this.clickMe = this.clickMe.bind(this);
    }

    clickMe() {
        this.reward.rewardMe();
    }

    componentDidMount() {
        setTimeout(function () { //Start the timer
            this.setState({ render: true })
            this.reward.rewardMe(); //After 1 second, set render to true
        }.bind(this), 2300)

    }




    render() {
        return (
            <div className={`col-lg-6 align-self-stretch justify-content-between d-flex clearfix mt-2 mt-lg-0 ${this.props.shine}`}>
                <div className="count-box-small d-flex align-items-center justify-content-end" style={{ color: `${this.props.color}` }} >
                    <i className={`${this.props.boxIcon}`}></i>
                    <div className='counter pl-2' >

                        <Reward
                            ref={ref => {
                                this.reward = ref;
                            }}
                            type="memphis"
                        >
                            <div>
                                <CountUp start={this.props.count - 1} end={this.props.count} duration={0} delay={2} />
                            </div>
                        </Reward>
                        <p style={{ color: 'gray' }}>{this.props.cardText}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export { LevelCard };
