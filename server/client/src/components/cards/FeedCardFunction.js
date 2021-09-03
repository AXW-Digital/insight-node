import FeedCard from './FeedCards'
import FeedCardsHome from './FeedCardsHome'
// import AOS from 'aos';

import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';

export default class FeedCardComp extends Component {

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
                        socialId={this.props.socialId}
                        key={this.props.key}
                        name={this.props.name}
                        picUrl={this.props.picUrl}
                        formTitle={this.props.formTitle}
                        formText={this.props.formText}
                        formUrl={this.props.formUrl}
                        color={this.props.color}
                        minutes={this.props.minutes}
                        tyyppi={this.props.tyyppi}
                        date={this.props.date}
                        content={this.props.formContent}
                        clickHandler={this.props.clickHandler}
                        likeHandler={this.props.likeHandler}
                        expandHandler={this.props.expandHandler}
                        shareHandler={this.props.shareHandler}
                        liked={this.props.liked}
                        shared={this.props.shared}
                        userId={this.props.userId}
                    />
                </Fade>
            </div>
        )
    }
}


class FeedCardsHomeComp extends Component {

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
                    <FeedCardsHome
                        socialId={this.props.socialId}
                        key={this.props.key}
                        name={this.props.name}
                        picUrl={this.props.picUrl}
                        formTitle={this.props.formTitle}
                        formText={this.props.formText}
                        formUrl={this.props.formUrl}
                        color={this.props.color}
                        minutes={this.props.minutes}
                        tyyppi={this.props.tyyppi}
                        date={this.props.date}
                        content={this.props.formContent}
                        clickHandler={this.props.clickHandler}
                        likeHandler={this.props.likeHandler}
                        expandHandler={this.props.expandHandler}
                        shareHandler={this.props.shareHandler}
                        liked={this.props.liked}
                        shared={this.props.shared}
                    />
                </Fade>
            </div>
        )
    }
}

export { FeedCardsHomeComp, FeedCardComp }