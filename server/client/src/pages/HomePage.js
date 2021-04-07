import React, { Component } from 'react'
import Header from '../components/parts/HeaderHome';
import Footer from '../components/parts/Footer'
import { ReactComponent as Ideas } from '../assets/images/ideas.svg'
import cardvaluelist from '../assets/js/cardvalues'
import {createCard} from '../components/cards/CardFunctions'
import {createActivityCard} from '../components/cards/CardFunctions'

var Name = 'John Doe'



export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Header />
                <div id='page-top'></div>
                <section id="hero" className="d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-2">
                                <h1>Tervetuloa {Name}!</h1>
                                <p>Mitä tekstiä tälle sivulle kuuluu? Pystyisikö tähän koostamaan vastaajan aktiivisuutta tai nostamaan viime kyselyn vaikutuksia?</p>
                                <div className='counts'>
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
                        <div className="row g-4 d-flex">
                            {cardvaluelist.filter(card => card.tyyppi === 'Vastaa').map(createCard)}
                        </div>
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
