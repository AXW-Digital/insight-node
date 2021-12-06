// Core
import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
// Components
import Footer from '../components/parts/Footer';
import Loader from '../components/parts/Loader';
import cardvaluelist from '../assets/js/cardvalues';
import { createCard } from '../components/cards/CardFunctions';
import Accordion from '../components/parts/Accordion';
// Modules
import { Card } from 'react-bootstrap';
import { Collapse } from 'antd';
import { LoremIpsum } from "lorem-ipsum";
// Media
import { ReactComponent as Searching } from '../assets/images/searching.svg';
import { ReactComponent as Faq } from '../assets/images/faq.svg';
import { ReactComponent as Completed }  from '../assets/images/completed.svg'
import keys from '../config/keys';


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
            faqPoints: [] 
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

        axios.get('../api/faq').then(response => {
            const faqPoints = response.data.sort((a, b) => a.index - b.index);
            this.setState({ faqPoints});
        }).catch(err => {
            console.log(err)
        });

        fetch("/api/cards")
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
        // console.log(surveyAns)
        switch (isLoading) {

            default:
                return <Loader />


            case false:

                // check already answered questions [surveyAns] against questions that are renewable, then
                // if too much time has elapsed filter away from available cards. Also filter 'answer only once'
                // type of questions if already answered 

                const surveysToRender = (surveyAns) => {
                    const renewableSurveysList = cardvaluelist.filter(card => (card.tyyppi === 'Vastaa' && card.resetHours !== undefined));
                    const renewableSurveysIdList = renewableSurveysList.map(a => parseInt(a.formUrl) - 1);
                    var i;
                    const surveyList = [];
                    for (i = 0; i < surveyAns.list.length; i++) {
                        const surveyId = surveyAns.list[i].id
                        var renewSurvey
                        var hoursSinceSubmit = surveyAns.list.filter(x => x.id === (parseInt(surveyId) + 1).toString())
                        if(hoursSinceSubmit.length > 0 ){
                            hoursSinceSubmit = hoursSinceSubmit[0].diff
                        } else {
                            hoursSinceSubmit = 99999
                        }
                        
                        const SurveyResetTime = renewableSurveysList.filter(item => parseInt(item.formUrl) === parseInt(surveyId) + 1 ).map(a => a.resetHours)[0]

                        // check if enough time has passed since survey was ansered
                        SurveyResetTime <= hoursSinceSubmit ? renewSurvey = true : renewSurvey = false

                        // if a renewable survey id is in the list of submitted surveys, check if can be removed and delete from that list 
                        if (renewableSurveysIdList.includes(parseInt(surveyId)) && !renewSurvey) {
                            surveyList.push(parseInt(surveyId) + 1)
                        }
                    }
                    return surveyList
                }

                var nonRenewableSurveyList = surveysToRender(surveyAns)
                var renewableSurveys = cardvaluelist.filter(x => !nonRenewableSurveyList.includes(parseInt(x.formUrl)))


                // renewableSurveyList = renewableSurveyList.map(x => x - 1)
                // console.log(renewableSurveys)

                var surveyCount = cardvaluelist.filter(card => card.tyyppi === 'Vastaa').map(createCard)
                var renewableSurveysId

                renewableSurveysId = renewableSurveys.map(x => x.formUrl)





                if (surveyAns.id.length !== 0){
                    surveyCount = surveyCount.filter( card => (renewableSurveysId.includes(card.props.formUrl)
                ))
                }
                
                

                if (surveyCount === undefined || surveyCount.length === 0) {
                    // console.log(surveyCount)
                    return <div className='home-message vh-75'>
                        <div className = 'container'>
                            <p className = 'mt-5'>
                        Olet ollut aktiivinen vaikuttaja! Uusia kysymyksiä tulossa pian...
                        </p>
                        <Completed/>
                        </div>
                        </div>

                } else {
                    // console.log(surveyCount)
                    return (
                        <div className="row g-4 d-flex">
                            {surveyCount}
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

    renderFaq(){
        return this.state.faqPoints.map((point) => {
            return (
                <Accordion 
                    title={point.title}
                    content={point.content}
                    index={point.index}
                />
            );
        })


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
                                        <p>Pisteet ovat tapamme palkita sinua osallistumisesta ja aktiivisuudesta. Keräät pisteitä vastaamalla kyselyihin ja tutkimuksiin, tekemällä ruoka- juoma- ja ravintola-arvosteluja sekä muita palvelumme aktiviteetteja. Jokainen tutkimus on pisteytetty sen mukaan, kuinka laaja kyselytutkimus on. Näet kertyvät pisteet jokaisen tutkimuksen yhteydessä. 
                                        </p>
                                        <p>
                                        Osaan tutkimuksista voit vastata vain kerran, ravintola- ruoka- ja juoma-arvosteluja voit tehdä vaikka joka päivä.   
                                        </p>
                                        <p>
                                        Keräämällä pisteitä etenet Vaikuttajatasoilla ja ansaitset kuponkeja. Kupongeilla pääset pyöräyttämään arvontapyörää ja voittamaan palkintoja!  
                                        </p>
                                        <h3> Mitä kupongit ovat? </h3>
                                        <p>Etenet Vaikuttajatasoilla keräämällä pisteitä. Kun keräät tietyn määrän pisteitä, saavutat seuraavan tason ja ansaitset uuden kupongin. Kupongilla pyöräytät arvontapyörää ja voit voittaa palkinnon. Ansaitut kupongit ovat tasosta riippuen joko pronssi-, hopea- tai kultakuponkeja.  
                                        </p>
                                        <br/>
                                        <p>
                                        Pronssisella kupongilla on 25% mahdollisuus voittaa
                                        </p>
                                        <br/>
                                        <p>
                                        Hopeisella kupongilla on 50% mahdollisuus voittaa
                                        </p>
                                        <br/>
                                        <p>
                                        Kultaisella kupongilla jokainen pyöräytys oikeuttaa voittoon!
                                        </p>
                                        <br/>
                                        <p>
                                        Palkintojen arvo kasvaa kupongin arvon myötä. Mitä enemmän keräät pisteitä ja etenet tasoilla, sitä parempia ja arvokkaampia etuja ja palkintoja voit ansaita!
                                        </p>
                                        <div className="icon-box">
                                            <Card className="description shadow-lg p-3 mb-5 bg-white rounded" data-aos="flip-up" data-aos-duration="200" data-aos-delay="300">
                                                Syksyn kampanjassa jaamme yli 1000€ arvosta palkintoja ja lahjakortteja!
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
                                       
                                        {this.renderFaq()}

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