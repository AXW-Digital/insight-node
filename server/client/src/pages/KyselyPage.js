import React, { useEffect, useState, Component } from 'react';
import { connect } from 'react-redux';
import KyselyForm from '../components/forms/KyselyForm';
import Loader from '../components/parts/Loader';
import surveyApi from '../functions/surveyApi';

import Footer from '../components/parts/Footer';
// import $ from 'jquery';

import keys from '../config/keys';
import axios from 'axios';








class KyselyPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: [],
			surveyAns: []
		};
	}


	componentDidMount() {
		const profile = this.props.data.profile
		console.log(profile)
		fetch(keys.adminUrl + "/api/surveys")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result
					});
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)

		axios.get('../api/surveys/count').then(response => {
				this.setState({ surveyAns: response.data });
			});
	}




	render() {
		const { error, isLoaded, items, surveyAns } = this.state;
		const profile = this.props.data.profile

		switch (profile) {
			case null:
				return <Loader />
			default:

				if (error) {
					return <div>Error: {error.message}</div>;
				} else if (!isLoaded) {
					return <Loader />;
				} else {
					return (
						<div>

							<div id='page-top'> </div>
							<section id='kysely' className='odd-section'>
								<div className='container'>
									<KyselyForm
										question={this.props.match.params.id - 1}
										currentPoints={profile.points}
										kyselyt={items}
										surveyAns={surveyAns}
									/>
								</div>
							</section>
							<Footer />
						</div>

					);
				}
		}

	}
}



function mapStateToProps(data) {
	return { data };
}



export default connect(mapStateToProps)(KyselyPage);