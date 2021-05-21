import VoucherCard from './VoucherCard'
import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';

export default class VoucherCardClassFunc extends Component {

    render() {
        return (
            <div className='list-item'>
                <Fade >
                    <VoucherCard
                        key={this.props.key}
                        name={this.props.name}
                        picUrl={this.props.picUrl}
                        formTitle={this.props.formTitle}
                        formText={this.props.formText}
                        benefit={this.props.benefit}
                        tyyppi={this.props.tyyppi}
                        valid={this.props.valid}
                        dateStart={this.props.dateStart}               
                        />
                </Fade>
            </div>
        )
    }
}
