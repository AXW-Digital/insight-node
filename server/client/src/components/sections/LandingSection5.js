import React, { Component } from 'react';
import {ReactComponent as Data} from '../../assets/images/datasvg.svg'
import { Card } from 'react-bootstrap';

class LandingSection5 extends Component {
    render() {
        return (
            <div>
              <section className="d-flex align-items-center odd-section">
                <div className="container">
                <div className="row">
                    <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1">
                        <h3>GROWSIGHT Oy</h3>
                        <p>Intohimomme on auttaa yrittäjiä ymmärtämään asiakkaita ja toimintaympäristöä! Ymmärrys on paras pohja kehitykselle ja tulevaisuudelle. </p>
                        <p>Kaikki perustuu yhteisön ajatuksiin, joita rikastamme jo kerätyllä datalla. </p>

                        <h3>Kumppanimme</h3>
                        <p>Yhteistyökumppaneina meillä on ruokaan, ravintolaelämyksiin ja nautiskeluun liittyviä pieniä ja suuria yrityksiä ja yrittäjiä ympäri Suomen - ravintoloita, kahviloita, pienpanimoja, viinibaareja...
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

export default LandingSection5;