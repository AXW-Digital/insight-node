import React, { Component } from 'react';
import CountUp from 'react-countup';

class ActivityCard extends Component {
    render() {
        return (
            <div className={'col-md-6 my-3'}>
                <div className="count-box justify-content-center" style={{ color: `${this.props.color}` }}>
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

export default ActivityCard;

class ActivityCardSmall extends Component {
    render() {
        return (
            <div className={'col-xl-2 col-lg-6 align-self-stretch justify-content-between d-flex clearfix mt-2 mt-lg-0'}>
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

export {ActivityCardSmall};