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

import {FeedCardsHomeComp} from '../cards/FeedCardFunction'
import Carousel from "react-multi-carousel";
import keys from '../../config/keys';



class Shuffle extends Component {
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

		this.sendClosed = this.sendClosed.bind(this);
		this.sendLike = this.sendLike.bind(this);
        this.sendExpand = this.sendExpand.bind(this);
        this.sendShared = this.sendShared.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
	}

	componentDidMount() {

		const socials = this.props.data.socials
		
		const getData = async () =>  {
		await fetch(keys.localUrl + "/api/cards")
            .then(res => res.json())
            .then(
                (result) => {
					console.log('result for socials: ', result)
                    var articles = result.filter(x => x.tyyppi === 'Feed').sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
                    var socialData = socials
                    // const userArticles = articles.map(t1 => ({ ...t1, ...socialData.find(t2 => t2.voucherId === t1.voucherId) }))
                    var merged = _.merge(_.keyBy(socialData, 'socialId'), _.keyBy(articles, '_id'));
                    var values = _.values(merged);

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
		}

		getData();
	}

	moveArticle(source, dest, id) {
		const sourceArticles = this.state[source].slice();
		let destArticles = this.state[dest].slice();
	
		if ( !sourceArticles.length ) return;
	
		// Find the index of the article clicked.
		// If no ID is provided, the index is 0
		const i = id ? sourceArticles.findIndex(article => article.id === id) : 0;
	
		// If the article is already removed, do nothing.
		if ( i === -1 ) return;
	
		destArticles = [].concat( sourceArticles.splice(i, 1), destArticles );
	
		this.setState({
		  [source]: sourceArticles,
		  [dest]: destArticles,
		});
	  }

	
	async sendClosed(id){
		
		const userId  = this.props.data.profile._user
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

	async sendExpand(id){
		
		const userId  = this.props.data.profile._user
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

    async sendLike(id){
		
		const userId  = this.props.data.profile._user
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

    async sendShared(id){
		
		const userId  = this.props.data.profile._user
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


	clickHandler(id, socialId){
		this.moveArticle('articles', 'removedArticles', id)
		this.sendClosed(socialId)
	}

	renderArticles() {
		const userId = this.props.data.profile._user
		return this.state.articles.map((article, i) => {
			return (
				<div>
					<FeedCardsHomeComp
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
						feedType={article.feedType}
						{...article}
					/>
				</div>
			);
		});
	}

	render() {
		const responsive = {
			superLargeDesktop: {
				// the naming can be any, depends on you.
				breakpoint: { max: 4000, min: 3000 },
				items: 5
			},
			desktop: {
				breakpoint: { max: 3000, min: 1024 },
				items: 3
			},
			tablet: {
				breakpoint: { max: 1024, min: 766 },
				items: 2
			},
			mobile: {
				breakpoint: { max: 766, min: 0 },
				items: 1,
			}
		};

		return (

			<div className="d-flex align-items-center even-section justify-content-center">
				<div className="container mt-3">
					<h3> Newsfeed </h3>
						<Carousel
							swipeable={true}
							draggable={true}
							showDots={false}
							responsive={responsive}
							ssr={true} // means to render carousel on server-side.
							infinite={true}
							autoPlay={this.props.deviceType !== "mobile" ? true : false}
							autoPlaySpeed={4000}
							keyBoardControl={true}
							transitionDuration={500}
							containerClass="carousel-container"
							removeArrowOnDeviceType={["tablet", "mobile"]}
							deviceType={this.props.deviceType}
							dotListClass="custom-dot-list-style"
							itemClass="carousel-item-padding-40-px"
						>
							{this.renderArticles()}
						</Carousel>
				</div>
			</div>

		);
	}
};

function mapStateToProps(data) {
	return { data };
}

export default connect(mapStateToProps)(Shuffle);



