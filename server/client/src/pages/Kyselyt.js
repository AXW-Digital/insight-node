// Core
import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
// Components
import Footer from '../components/parts/Footer';
import Loader from '../components/parts/Loader';
import cardvaluelist from '../assets/js/cardvalues';
import { createCard } from '../components/cards/CardFunctions';
import Accordion from '../components/parts/Accordion'
// Modules
import { Card } from 'react-bootstrap';
import { Collapse } from 'antd';
import { LoremIpsum } from "lorem-ipsum";
// Media
import { ReactComponent as Searching } from '../assets/images/searching.svg';
import { ReactComponent as Faq } from '../assets/images/faq.svg';


const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});




class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true, 
            surveysAns: undefined, 
            isProfile: null,
            cards: [],
            error: null,
            isLoaded: false, 
        };
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

        fetch("https://vaikuttava-admin.ngrok.io/api/cards")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        cards: result.filter(x => x.tyyppi === 'Vastaa').sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
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

    renderCards() {
        const { isLoading, surveyAns } = this.state;
        const cardvaluelist = this.state.cards
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
        const { Panel } = Collapse;
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
                        <section id='kyselyt' className="d-flex align-items-center justify-content-center kysely odd-section">
                            <div className="container card-container" data-aos="fade-up">
                                <header className="section-header">
                                    <h3 id='kysely-title mt-2'>Kerää pisteitä vastaamalla kyselyihin</h3>
                                </header>
                                {this.renderCards()}
                            </div>
                        </section>

                        <section className="d-flex align-items-center even-section">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 order-1 order-lg-1">
                                        <h3>Mitä pisteet ovat?</h3>
                                        <p>Pisteet ovat tapamme palkita Vaikuttavia aktiivisuudesta. Pisteitä kertyy vastaamalla kyselyihin, rekrytoimalla, jne. Kerryttämällä pisteitä kiipeät ylös vaikuttajatasoja, jolloin piste, kuponki ja palkintokertymät kasvavat.
                                        </p>
                                        <h3> Mitä kupongit ovat? </h3>
                                        <p>Kupongit ovat keräämiäisi arpoja, joilla voit osallistua säännöllisesti järjestämiimme arvontoihin. Joka arvonnan päätyttyä kupongit nollautuvat. Kuponkeja kerrytät vastaamalla kyselyihin. Mikäli kyselyyn kuuluu oma vastaaja-arvonta, eivät kuluta kuponkeja. Voittajille ilmoitetaan sähköpostitse. Seuraava arvonta xx.x.
                                        </p>
                                        <div className="icon-box">
                                            <Card className="description shadow-lg p-3 mb-5 bg-white rounded" data-aos="flip-up" data-aos-duration="200" data-aos-delay="300">
                                                Viime arvonnan voittajat Laura Helsinki ja Jokke Joensuu!
                                            </Card>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 order-1 order-lg-2 kukka-img">
                                        <div className="img-fluid animated">
                                            <Searching />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                        <section className="d-flex align-items-center odd-section">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 order-2 order-lg-2">
                                        <h3>FAQ - Usein kysytyt kysymykset</h3>
                                        <Accordion
                                            title="Mikä on vaikuttava.io?"
                                            content={lorem.generateParagraphs(1)}
                                        />
                                        <Accordion
                                            title="Mitä kupongit ovat?"
                                            content={lorem.generateParagraphs(1)}
                                        />
                                        <Accordion title="Mitä pisteet ovat? Kuinka niitä kertyy?"
                                            content={'Pisteet ovat tapamme palkita Vaikuttavia aktiivisuudesta. Pisteitä kertyy vastaamalla kyselyihin, rekrytoimalla jne. Kerryttämällä pisteitä kiipeät ylös vaikuttajatasoja, jolloin piste, kuponmki ja palkintokertymät kasvavat.'}
                                        />
                                        <Accordion
                                            title="Mistä näen profiilini?"
                                            content={lorem.generateParagraphs(1)}
                                        />
                                        <Accordion
                                            title="Kuinka poistan tilini?"
                                            content={lorem.generateParagraphs(1)}
                                        />
                                    </div>
                                    <div className="col-lg-6 order-1 order-lg-1">
                                        <div className="img-fluid animated ">
                                            <Faq />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>

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