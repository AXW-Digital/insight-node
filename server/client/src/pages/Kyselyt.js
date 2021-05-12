import React, { Component } from 'react'
import { connect } from 'react-redux';
import Footer from '../components/parts/Footer'
// import { ReactComponent as Ideas } from '../assets/images/ideas.svg'
import cardvaluelist from '../assets/js/cardvalues'
import { createCard } from '../components/cards/CardFunctions'
// import { createActivityCard } from '../components/cards/CardFunctions'
// import ActivityCard from '../components/cards/ActivityCard'
import axios from 'axios';

import Loader from '../components/parts/Loader'

// getLevel function
import getLevel, { levelThresholds } from '../functions/getLevel'


// Circular-progress-bar
import {
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


// Animation
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "../components/parts/AnimatedProgressProvider";

// Progress bar
import StepProgressBar from "../components/parts/ProgressBar";







class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, surveysAns: undefined, isProfile: null };
    }

    componentDidMount() {
        console.debug("After mount! Let's load data from API...");
        axios.get('../api/surveys/count').then(response => {
            this.setState({ surveyAns: response.data });
            this.setState({ isLoading: false });
        });
        axios.get('../api/profile').then(response => {
            this.setState({ isProfile: true });
        }).catch(err => {
            this.setState({ isProfile: false })
        });
    }

    renderCards() {
        const { isLoading, surveyAns } = this.state;
        console.log(surveyAns)
        switch (isLoading) {

            default:
                return <Loader /> 


            case false:

                const surveysToRender = (surveyAns) => {
                    const renewableSurveysList = cardvaluelist.filter(card => (card.tyyppi === 'Vastaa' && card.resetHours !== undefined));
                    const renewableSurveysIdList = renewableSurveysList.map(a => a.id);
                    var i;
                    const surveyList = [];
                    for (i = 0; i < surveyAns.list.length; i++) {
                        const surveyId = surveyAns.list[i].id
                        var renewSurvey
                        const hoursSinceSubmit = Math.floor((surveyAns.list[i].diff / (1000 * 60 * 60)) % 24)
                        const SurveyResetTime = renewableSurveysList.filter(item => item.id === surveyId).map(a => a.resetHours)[0]

                        // check if enough time has passed since survey was ansered
                        SurveyResetTime <= hoursSinceSubmit ? renewSurvey = true : renewSurvey = false

                        // if a renewable survey id is in the list of submitted surveys, check if can be removed and delete from that list 
                        if (renewableSurveysIdList.includes(surveyId) && renewSurvey) {
                            surveyList.push(surveyId)
                        }
                    }
                    return surveyList
                }

                var renewableSurveyList = surveysToRender(surveyAns)
                console.log(renewableSurveyList)

                const surveyCount = cardvaluelist
                    .filter(
                        card => card.tyyppi === 'Vastaa' &&
                            (!surveyAns.id.includes(card.id) || renewableSurveyList.includes(card.id)
                            ))
                    .map(createCard)

                if (surveyCount === undefined || surveyCount.length === 0) {
                    console.log(surveyCount)
                    return <div className='home-message vh-100'>Olet ollut aktiivinen vaikuttaja! Uusia kysymyksiä tulossa pian...</div>

                } else {
                    console.log(surveyCount)
                    return (
                        <div className="row g-4 d-flex">
                            {cardvaluelist
                                .filter(
                                    card => card.tyyppi === 'Vastaa' &&
                                        (!surveyAns.id.includes(card.id) || renewableSurveyList.includes(card.id)
                                        ))
                                .map(createCard)
                            }
                        </div>
                    )
                }

        }

    }




    renderContent() {
        const profile = this.props.data.profile;
        switch (profile) {
            case null:
                return <Loader /> 
            default:
                console.log(profile)
                return <h1>Tervetuloa {profile.fName}!</h1>

        }
    }



    render() {
        const profile = this.props.data.profile;
        switch (profile) {
            case null:
                const { isProfile } = this.state;
                switch (isProfile) {
                    case false:
                        return <Loader /> 
                    default:
                        return <Loader /> 
                }
            default:

                const { surveyAns } = this.state;

                return (
                    <div>
                        <div id='page-top'></div>
                        <section id='kyselyt' className="d-flex align-items-center justify-content-center kysely">
                            <div className="container card-container" data-aos="fade-up">
                                <header className="section-header">
                                    <h3 id='kysely-title mt-2'>Kyselyt</h3>
                                </header>
                                {this.renderCards()}
                            </div>
                        </section>

                        {/* Menutests commented out due to not being part of current plan */}

                        {/* <section id='menutestaus' className="d-flex align-items-center bg-light justify-content-center kysely">
                        <div className="container card-container" data-aos="fade-up">
                            <header className="section-header">
                                <h3>Menutestaukset</h3>
                                <p>Veritatis et dolores facere numquam et praesentium</p>
                            </header>
                            <div className="row g-4 d-flex">
                                {cardvaluelist.filter(card => card.tyyppi === 'Osallistu').map(createCard)}
                            </div>
                        </div>
                    </section> */}

                        <Footer />
                    </div>
                )






        }
    }
}

function mapStateToProps(data) {
    return { data };

}

export default connect(mapStateToProps)(HomePage);