import React from 'react';
import { ReactComponent as Messages } from '../../assets/images/messages.svg'
import { Card } from 'react-bootstrap'


class LandingSection2 extends React.Component {
    render() {
        return (
            <div>
                <section className="d-flex align-items-center jumptarget even-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1">
                                <h3>KUKA VOI OLLA VAIKUTTAVA</h3>
                                {/* <p>Ja sitten pienellä präntillä, kuka vain täysi-ikäinen voi olla vaikuttava! Pienissä on voimaa, mutta annetaan heille kasvurauha.
                            </p>
                            <div className="icon-box">
                                <Card className="description shadow-lg p-3 mb-5 bg-white rounded" data-aos="flip-up" data-aos-duration="200" data-aos-delay="300">
                                Olet vaikuttava! Se on sinun supervoima.
                                </Card>
                            </div> */}
                                <p>
                                    Ruoka, ravintolat, elämykset ja tulevaisuus koskettavat meitä kaikkia. Siksi Vaikuttavaksi voi liittyä kuka tahansa täysi-ikäinen ruoasta,
                                    ravintoloista ja nautiskelusta kiinnostunut henkilö, joilla on halu vaikuttaa ja samalla auttaa yrittäjiä kehittämään entistä vaikuttavampia tuotteita, palveluja ja elämyksiä.
                                </p>
                                <div className="hyodyt">
                                    <h3 className="text-uppercase">MIKSI MUKAAN</h3>
                                    <ul className='linelist'>
                                        <li >Pääset vaikuttamaan itseäsi kiinnostaviin aiheisiin</li>
                                        <li >Osallistut kumppaniemme tarjoamien palkintojen arvontaan</li>
                                        <li >Pääset mukaan tuote- ja palvelutestauksiin</li>
                                        <li >Pääset käyttämään supervoimaasi hyvään!</li>
                                        <li >Saat tiivistelmiä tutkimusten tuloksista – pääset vertailemaan omia vastauksia muiden vastauksiin ja samalla saat tietoa uusista trendeistä</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 order-1 order-lg-2 kukka-img">
                                <div className="img-fluid animated">
                                    <Messages />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default LandingSection2;