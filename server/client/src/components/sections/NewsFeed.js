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
    }

    componentDidMount() {
        fetch("https://vaikuttava-admin.ngrok.io/api/cards")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        articles: result.filter(x => x.tyyppi === 'Feed').sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
                    });
                    console.log(result.filter(x => x.tyyppi === 'Feed').sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)))
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
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

    sortRotate() {
        const articles = this.state.articles.slice();
        articles.unshift(articles.pop())

        this.setState({
            sortingMethod: 'rotate',
            articles
        });
    }

    renderArticles() {
        return this.state.articles.map((article, i) => {
            return (
                    <FeedCardComp
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
                        clickHandler={throttle(() => this.moveArticle('articles', 'removedArticles', article.id), 800)}
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



