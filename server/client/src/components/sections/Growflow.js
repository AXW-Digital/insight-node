import React, { Component } from 'react';
import {ReactComponent as Data} from '../../assets/images/datasvg.svg'
import { Card } from 'react-bootstrap';

class Growflow extends Component {
    render() {
        return (
            <div>
              <section id="growflow" className="d-flex align-items-center">
                <div className="container">
                <div className="row">
                    <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1">
                        <h3>GROWFLOW INSIGHTS</h3>
                        <p> Intohimomme on ymmärtää ihmisiä, asiakkaita, kuluttajia, käyttäytymistä, maailmaa. 
                            Yhdistämme asiakasymmärryksen ja teknologian.  Keräämme, analysoimme, yhdistämme ja 
                            rikastamme dataa yritysten käyttöön entistä parempien ja vaikuttavimpien tuotteiden 
                            ja palvelujen kehittämiseen. 
                        </p>

                        <h3>Kumppanimme</h3>
                        <p>Yhteistyökumppaneina meillä on ruokaan, ravintolaelämyksiin  ja nautiskeluun liittyviä 
                            pieniä ja suuria yrityksiä ja yrittäjiä ympäri Suomen -  ravintoloita, kahviloita, pienpanimoja, 
                            viinibaareja...
                        </p>
                        <div className="icon-box">
                            <Card className="description shadow-lg p-3 mb-5 bg-white rounded" data-aos="flip-up" data-aos-duration="200" data-aos-delay="300">
                            Kumppanimme ovat nautiskeluun erikoistuneita yrityksiä ja palveluntarjoajia
                            </Card>
                        </div>
                    </div>
                    <div className="col-lg-6 order-1 order-lg-2 growflow-img">
                        <div className="img-fluid animated">
                            <Data />
                        </div>
                    </div>
                </div>
                </div>
            </section>
            </div>
        );
    }
}

export default Growflow;