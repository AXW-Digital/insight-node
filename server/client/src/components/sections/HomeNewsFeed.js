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


	renderArticles() {
		return this.state.articles.map((article, i) => {
			return (
				<div>
					<FeedCardsHomeComp
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

			<section className="d-flex align-items-center even-section justify-content-center">
				<div className="container mt-3">
					<h3> Newsfeed </h3>
					<div className='container'>
						<Carousel
							swipeable={true}
							draggable={true}
							showDots={true}
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
			</section>

		);
	}
};

function mapStateToProps(data) {
	return { data };
}

export default connect(mapStateToProps)(Shuffle);



