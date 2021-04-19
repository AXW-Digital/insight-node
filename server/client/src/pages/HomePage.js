import React, { Component } from 'react'
import { connect } from 'react-redux';
import Footer from '../components/parts/Footer'
import { ReactComponent as Ideas } from '../assets/images/ideas.svg'
import cardvaluelist from '../assets/js/cardvalues'
import {createCard} from '../components/cards/CardFunctions'
import {createActivityCard} from '../components/cards/CardFunctions'
import axios from 'axios';





class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, surveysAns: undefined };
    }

    componentDidMount() {
        console.debug("After mount! Let's load data from API...");
        axios.get('../api/surveys/count').then(response => {
          this.setState({ surveyAns: response.data });
          this.setState({ isLoading: false });
        });
    }
    
    renderCards() {   
        const { isLoading, surveyAns } = this.state;     
        console.log(surveyAns)
        switch(isLoading){
            default:
                return (<div className="row g-4 d-flex">
                        Loading....
                        </div>)
            case false:
                const surveyCount = cardvaluelist.filter(card => card.tyyppi === 'Vastaa' && !surveyAns.includes(card.id)).map(createCard)
                
                if (surveyCount === undefined || surveyCount.length === 0) {
                        console.log(surveyCount)
                        return <div>Olet vastannut kaikkiin kyselihin!</div>
                } else {
                    console.log(surveyCount)
                        return (                            
                            <div className="row g-4 d-flex">
                            {cardvaluelist.filter(card => card.tyyppi === 'Vastaa' && !surveyAns.includes(card.id)).map(createCard)
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
                return null
            default:
                console.log(profile)
                return <h1>Tervetuloa {profile.fName}!</h1>               

        }      
    }

    render() {
        return (
            <div>                
                <div id='page-top'></div>
                <section id="hero" className="d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-2">
                                {this.renderContent()}
                                <p>Mitä tekstiä tälle sivulle kuuluu? Pystyisikö tähän koostamaan vastaajan aktiivisuutta tai nostamaan viime kyselyn vaikutuksia?</p>                                <div className='counts'>
                                    <div className='row m-4'>
                                {cardvaluelist.filter(card => card.tyyppi === 'Activity').map(createActivityCard)}
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
                            <h3>Kyselyt</h3>
                            <p>Veritatis et dolores facere numquam et praesentium</p>
                        </header>                        
                        {this.renderCards()}                        
                    </div>
                </section>
                <section id='menutestaus' className="d-flex align-items-center bg-light justify-content-center kysely">
                    <div className="container card-container" data-aos="fade-up">
                        <header className="section-header">
                            <h3>Menutestaukset</h3>
                            <p>Veritatis et dolores facere numquam et praesentium</p>
                        </header>
                        <div className="row g-4 d-flex">
                        {cardvaluelist.filter(card => card.tyyppi === 'Osallistu').map(createCard)}
                        </div>
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

export default connect(mapStateToProps)(HomePage);