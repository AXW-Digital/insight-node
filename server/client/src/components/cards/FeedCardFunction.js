import FeedCard from './FeedCards'
// import AOS from 'aos';

import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';

export default class FeedCardFunction extends Component {

    // componentDidMount() {
    //     AOS.init({
    //         duration : 1500,
    //         once: true
    //       })
    // }


    render() {
        return (
            <div className='list-item'>
                <Fade >
                <FeedCard
                 key = {this.props.key}
                 name = {this.props.name}
                 picUrl = {this.props.picUrl}
                 formTitle = {this.props.formTitle}
                 formText = {this.props.formText}
                 formUrl = {this.props.formUrl}
                 color = {this.props.color}
                 minutes = {this.props.minutes}
                 tyyppi = {this.props.tyyppi}
                 date = {this.props.date}
                 content = {this.props.formContent}                
                />
                </Fade>
            </div>
        )
    }
}
