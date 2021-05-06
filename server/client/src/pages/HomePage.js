import React, { Component } from 'react'
import { connect } from 'react-redux';
import Footer from '../components/parts/Footer'
import { ReactComponent as Ideas } from '../assets/images/ideas.svg'
import cardvaluelist from '../assets/js/cardvalues'
import { createCard } from '../components/cards/CardFunctions'
import { createActivityCard } from '../components/cards/CardFunctions'
import ActivityCardSmall from '../components/cards/ActivityCard'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";

// Circular-progress-bar
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


// Animation
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "../components/parts/AnimatedProgressProvider";







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
                return (<div className="row g-4 d-flex">
                    <MoonLoader
                        size={50}
                        color={'#e3a509'} />
                </div>)


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
                return <MoonLoader
                    size={50}
                    color={'#e3a509'} />
            default:
                console.log(profile)
                return <h1>Tervetuloa {profile.fName}!</h1>

        }
    }



    render() {
        const maxLevelPoints = 1000
        const profile = this.props.data.profile;
        switch (profile) {
            case null:
                const { isProfile } = this.state;
                switch (isProfile) {
                    case false:
                        return <MoonLoader size={50} />
                    default:
                        return <MoonLoader size={50} />
                }
            default:
                console.log('profile fetched')
                const { surveyAns } = this.state;
                const pointsPercentage = this.props.data.profile.points / maxLevelPoints
                return (
                    <div>
                        <div id='page-top'></div>
                        <section id="hero" className="d-flex align-items-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-2">
                                        {this.renderContent()}
                                        <div className='progress-circle'>
                                        <AnimatedProgressProvider
                                            valueStart={0}
                                            valueEnd={pointsPercentage * 100}
                                            duration={2.5}
                                            easingFunction={easeQuadInOut}
                                        >

                                            {value => {
                                                const roundedValue = Math.round(value / 100 * maxLevelPoints);
                                                return (
                                                    <CircularProgressbarWithChildren
                                                        value={value}
                                                        text={`${roundedValue} / ${maxLevelPoints} pts`}
                                                        /* This is important to include, because if you're fully managing the
                                                        animation yourself, you'll want to disable the CSS animation. */
                                                        styles={buildStyles({
                                                            pathTransition: "none",
                                                            textSize: '10px',
                                                            pathColor: `rgba(0, 128, 0, ${value / 20})`,
                                                            textColor: 'rgb(0, 128, 0)',
                                                            trailColor: '#d6d6d6',
                                                            fontFamily: 'TT Norms'
                                                        })}
                                                    >
                                                        <i className='bx bx-bolt-circle'
                                                            style={{
                                                                width: 100,
                                                                marginTop: 20,
                                                                height: 200,
                                                                fontSize: 50,
                                                                color: 'rgb(0, 128, 0)'
                                                            }} />
                                                    </CircularProgressbarWithChildren>
                                                );
                                            }}

                                        </AnimatedProgressProvider>
                                        </div>
                                        <div className='counts'>
                                            <div className='row m-4'>
                                                <ActivityCardSmall
                                                    key={'a1'}
                                                    boxIcon={'bx bx-message-detail'}
                                                    count={surveyAns === undefined ? 0 : surveyAns === null ? 0 : surveyAns.id.length}
                                                    cardText={'Vastatut kyselyt'}
                                                    suffix={''}
                                                    color={'#007bff'}
                                                />
                                                <ActivityCardSmall
                                                    key={'a2'}
                                                    boxIcon={'bx bxs-medal'}
                                                    count={this.props.data.profile.level}
                                                    cardText={'Vaikuttaja taso'}
                                                    suffix={''}
                                                    color={'#007bff'}
                                                />
                                                {/* <ActivityCardSmall
                                                    key={'a3'}
                                                    boxIcon={'bx bx-bolt-circle'}
                                                    count={this.props.data.profile.points}
                                                    cardText={'Pisteet yhteensä'}
                                                    suffix={' pts'}
                                                    color={'green'}
                                                /> */}

                                                <ActivityCardSmall
                                                    key={'a4'}
                                                    boxIcon={'bx bx-diamond'}
                                                    count={this.props.data.profile.coupons}
                                                    cardText={'Kupongit yhteensä'}
                                                    suffix={''}
                                                    color={'blue'}
                                                    shine={'glowing'}
                                                />



                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 order-1 order-lg-1 hero-img align-items-center">
                                        <div className="img-fluid animated">
                                            <Ideas />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id='kyselyt' className="d-flex align-items-center justify-content-center kysely">
                            <div className="container card-container" data-aos="fade-up">
                                <header className="section-header">
                                    <h3 id='kysely-title'>Kyselyt</h3>
                                    {/* <p>Vastaamalla kyselyihin pääset keräämään pisteitä ja vaikuttamaan</p> */}
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