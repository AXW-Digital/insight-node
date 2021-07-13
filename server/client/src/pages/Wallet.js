// Core
import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
// Components
import Footer from '../components/parts/Footer';
import VoucherCard from '../components/cards/VoucherCardClassFunc';
import cardvaluelist from "../assets/js/cardvalues";
import { createVoucherCard } from '../components/cards/CardFunctions';
import Loader from "../components/parts/Loader";


import shuffle from 'lodash/shuffle';
import throttle from 'lodash/throttle';

import FlipMove from 'react-flip-move';
import Toggle from '../components/parts/Toggle';
import keys from '../config/keys';


class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            // surveysAns: undefined,
            userVouchers: [],
            isProfile: null,
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

    };

    componentDidMount() {

        
        // // use seperate function to get synchonously the userid 
        // function getVouchers ( userId ) {
        //     return axios.get('/api/vouchers/user/' + userId )
        //     .then((res) => {
        //         return res.data
        //     })
        // }

        // // fetch the users vouchers
        // axios.get('/api/profile').then((res) => {
        //     getVouchers(res.data._user).then((vouchers) => {
        //         this.setState({userVouchers: vouchers})
        //     })            
        // })




        
        

    };

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
        const sortAsc = (a, b) => a.createdAt - b.createdAt;
        const sortDesc = (a, b) => b.createdAt - a.createdAt;

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

    


    renderCards() {
        return this.state.articles.map((article, i) => {
            return (
                <VoucherCard
                    key={article.name}
                    name={article.name}
                    picUrl={article.picUrl}
                    formTitle={article.formTitle}
                    formText={article.formText}
                    benefit={article.benefit}
                    tyyppi={article.tyyppi}
                    valid={article.valid}
                    dateStart={article.dateStart}
                    index={i}
                    clickHandler={throttle(() => this.moveArticle('articles', 'removedArticles', article.id), 800)}
                    {...article}
                />
            );
        });
    }


    render() {

        const getCardData = () => {
            fetch(keys.adminUrl + "/api/cards")
            .then(res => res.json())
            .then(
                (result) => {
                    var userVouchers = this.props.data.vouchers
                    var articles = result.filter(x => x.tyyppi === 'Voucher').sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))                    
                    var userVoucherIds = userVouchers.map(x => x.voucherId)
                    userVoucherIds = userVoucherIds.map(parseInt)
                    articles = articles.filter((x) => userVoucherIds.includes(x.voucherId))
                    this.setState({
                        isLoaded: true,
                        articles 
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        }

        return (
            <div>
                <div id='page-top'></div>
                <section className="d-flex  even-section ">

                        <div className='container-fluid voucher-container mb-5'>

                            {this.state.isLoaded ? 

                            <>
                            <div className = 'row justify-content-center justify-content-xl-start ml-auto'>
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


                            <div className='row justify-content-center justify-content-xl-start '>
                                <FlipMove className="flip-wrapper grid"
                                    staggerDurationBy="200"
                                    duration={700}
                                    enterAnimation={this.state.enterLeaveAnimation}
                                    leaveAnimation={this.state.enterLeaveAnimation}
                                    easing='ease'
                                    typeName={null}
                                >

                                    {this.renderCards()}

                                </FlipMove>
                            </div>
                            </>

                            : 
                            
                            this.props.data.vouchers !== null ? getCardData() : <Loader/>
                            }

                        </div>

                </section>
                <Footer />
            </div>
        )

    }
}


function mapStateToProps(data) {
    return { data };

}

export default connect(mapStateToProps)(Wallet);