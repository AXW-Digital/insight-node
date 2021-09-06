import { connect } from "react-redux";
import Footer from "../../components/parts/Footer";
// import cardvaluelist from "../../assets/js/cardvalues";
import { createFeedCard } from "../../components/cards/CardFunctions";
import axios from "axios";
import Loader from "../../components/parts/Loader";

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import shuffle from 'lodash/shuffle';
import throttle from 'lodash/throttle';

import FlipMove from 'react-flip-move';
import Toggle from '../parts/Toggle';

import { FeedCardComp } from '../cards/FeedCardFunction'
import Carousel from "react-multi-carousel";
import keys from '../../config/keys';



class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            removedArticles: [],
            view: 'list',
            order: 'asc',
            sortingMethod: 'chronological',
            enterLeaveAnimation: 'accordionVertical',
            articles: [],
            error: null,
            isLoaded: false,
        };

        this.toggleList = this.toggleList.bind(this);
        this.toggleGrid = this.toggleGrid.bind(this);
        this.toggleSort = this.toggleSort.bind(this);
        this.sortRotate = this.sortRotate.bind(this);
        this.sortShuffle = this.sortShuffle.bind(this);
        this.sendClosed = this.sendClosed.bind(this);
        this.sendLike = this.sendLike.bind(this);
        this.sendExpand = this.sendExpand.bind(this);
        this.sendShared = this.sendShared.bind(this);
        this.renderArticles = this.renderArticles.bind(this);
    }

    componentDidMount() {


        var socialData = this.props.data.socials


        switch (socialData.length < 1) {
            case true:
                (
                    null
                )
            case false:
                (
                    fetch(keys.localUrl + "/api/cards")
                    .then(res => res.json())
                    .then(
                        (result) => {
                            var articles = result.filter(x => x.tyyppi === 'Feed').sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
                            socialData = this.props.socials
                            const userArticles = articles.map(t1 => ({ ...t1, ...socialData.find(t2 => t2.socialId === t1.id) }))
                            var merged = _.merge(_.keyBy(socialData, 'socialId'), _.keyBy(articles, '_id'));
                            var values = _.values(merged);
                            values = values.filter(x => x.closed === false)
        
                            this.setState({
                                isLoaded: true,
                                articles: values 
                            });  
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    )
                )
        }
        




    }





    toggleList() {
        this.setState({
            view: 'list',
            enterLeaveAnimation: 'accordionVertical'
        });
    }

    toggleGrid() {
        this.setState({
            view: 'grid',
            enterLeaveAnimation: 'accordionHorizontal'
        });
    }

    toggleSort() {
        const sortAsc = (a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp);
        const sortDesc = (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp);

        this.setState({
            order: (this.state.order === 'asc' ? 'desc' : 'asc'),
            sortingMethod: 'chronological',
            articles: this.state.articles.sort(
                this.state.order === 'asc' ? sortDesc : sortAsc
            )
        });
    }

    sortShuffle() {
        this.setState({
            sortingMethod: 'shuffle',
            articles: shuffle(this.state.articles)
        });
    }

    moveArticle(source, dest, id) {
        const sourceArticles = this.state[source].slice();
        let destArticles = this.state[dest].slice();

        if (!sourceArticles.length) return;

        // Find the index of the article clicked.
        // If no ID is provided, the index is 0
        const i = id ? sourceArticles.findIndex(article => article.id === id) : 0;

        // If the article is already removed, do nothing.
        if (i === -1) return;

        destArticles = [].concat(sourceArticles.splice(i, 1), destArticles);

        this.setState({
            [source]: sourceArticles,
            [dest]: destArticles,
        });
    }

    async sendClosed(id) {

        const userId = this.props.data.profile._user
        const socialId = id
        const closed = true

        const data = {
            userId,
            socialId,
            closed
        }

        await axios.post('/api/socials', data).then(
            (res) => {
                console.log(res.status)
            }
        ).catch(err => {
            console.log(err)
        })
    }


    async sendExpand(id) {

        const userId = this.props.data.profile._user
        const socialId = id
        const expanded = true

        const data = {
            userId,
            socialId,
            expanded
        }

        await axios.post('/api/socials', data).then(
            (res) => {
                console.log(res.status)
            }
        ).catch(err => {
            console.log(err)
        })
    }

    async sendLike(id) {

        const userId = this.props.data.profile._user
        const socialId = id
        const liked = true

        const data = {
            userId,
            socialId,
            liked
        }

        await axios.post('/api/socials', data).then(
            (res) => {
                console.log(res.status)
            }
        ).catch(err => {
            console.log(err)
        })
    }

    async sendShared(id) {

        const userId = this.props.data.profile._user
        const socialId = id
        const shared = true

        const data = {
            userId,
            socialId,
            shared
        }

        await axios.post('/api/socials', data).then(
            (res) => {
                console.log(res.status)
            }
        ).catch(err => {
            console.log(err)
        })
    }

    clickHandler(id, socialId) {
        this.moveArticle('articles', 'removedArticles', id)
        this.sendClosed(socialId)
    }





    sortRotate() {
        const articles = this.state.articles.slice();
        articles.unshift(articles.pop())

        this.setState({
            sortingMethod: 'rotate',
            articles
        });
    }



    renderArticles() {

        const userId = this.props.data.profile._user

        return this.state.articles.map((article, i) => {
            return (
                <FeedCardComp
                    socialId={article._id}
                    name={article.name}
                    picUrl={article.picUrl}
                    formTitle={article.formTitle}
                    formText={article.formText}
                    formUrl={article.formUrl}
                    color={article.color}
                    minutes={article.minutes}
                    tyyppi={article.tyyppi}
                    key={article.id + '_1'}
                    view={article.view}
                    date={article.timestamp}
                    content={article.formContent}
                    index={i}
                    clickHandler={throttle(() => this.clickHandler(article.id, article._id), 1000)}
                    expandHandler={throttle(() => this.sendExpand(article._id), 1000)}
                    likeHandler={throttle(() => this.sendLike(article._id), 1000)}
                    shareHandler={throttle(() => this.sendShared(article._id), 1000)}
                    liked={article.liked}
                    shared={article.shared}
                    closed={article.closed}
                    userId={userId}
                    {...article}
                />
            );
        });
    }

    render() {
        return (

            <section className="d-flex align-items-center even-section justify-content-center">
                <div className="container">
                    <h3> Newsfeed </h3>
                    <div id="shuffle" className={this.state.view}>
                        <header>
                            <div className="abs-right">
                                <Toggle
                                    clickHandler={this.toggleSort}
                                    text={this.state.order === 'asc' ? 'Uusin ensin' : 'Vanhin ensin'}
                                    icon={this.state.order === 'asc' ? 'angle-up' : 'angle-down'}
                                    active={this.state.sortingMethod === 'chronological'}
                                />
                                <Toggle
                                    clickHandler={this.sortShuffle}
                                    text="Shuffle" icon="random"
                                    active={this.state.sortingMethod === 'shuffle'}
                                />
                            </div>
                        </header>
                        <div className='container' style={{ padding: '0 5 0 5' }}>
                            <div className='row d-flex justify-content-center justify-content-xl-start'>
                                <FlipMove className="flip-wrapper grid"
                                    staggerDurationBy="200"
                                    duration={500}
                                    enterAnimation={this.state.enterLeaveAnimation}
                                    leaveAnimation={this.state.enterLeaveAnimation}
                                    easing='ease'
                                    typeName={null}
                                >

                                    {this.renderArticles()}

                                </FlipMove>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
};

function mapStateToProps(data) {
    return { data };
}

export default connect(mapStateToProps)(NewsFeed);



