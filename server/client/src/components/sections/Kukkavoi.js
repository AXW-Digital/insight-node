import React from 'react';
import {ReactComponent as Messages} from '../../assets/images/messages.svg'
import { Card } from 'react-bootstrap'


class Kukkavoi extends React.Component {
    render() {
        return (
            <div>
                  <section id="kukka" className="d-flex align-items-center jumptarget">
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1">
                            <h3>KUKA VOI OLLA KASVUVAIKUTTAJA</h3>
                            <p>Kasvu, palvelut, tuotteet ja elämykset kuuluvat kaikille, miksi kasvuvaikuttajaksi voi
                                ryhtyä kuka vain täysi-ikäinen henkilö. Kaikki, jotka haluavat vaikuttaa huomisen 
                                tuotteisiin ja palveluihin, ovat tervetulleita kasvuvaikuttajiin.
                            </p>
                            <div className="icon-box">
                                <Card className="description shadow-lg p-3 mb-5 bg-white rounded" data-aos="flip-up" data-aos-duration="200" data-aos-delay="300">
                                Oletko kiinnostunut vaikuttamaan sinulle tarjottuihin palveluihin ja tuotteisiin? 
                                Tervetuloa joukkoomme!
                                </Card>
                            </div>
                            <div className="hyodyt">
                                <h3>KASVUVAIKUTTAJAN HYÖDYT</h3>
                                <ul>
                                    <li>Pääset vaikuttamaan sinua kiinnostavien alojen kehittämiseen</li>
                                    <li>Osallistut arvontoihin</li>
                                    <li>Saat kuukausittaisia tarjouksia ja etuja yhteistyökumppaneiltamme</li>
                                    <li>Pääset mukaan exclusive-tapahtumiin</li>
                                    <li>Pääset testaamaan yhteistyökumppaneidemme uusia tuotteita ja palveluja</li>
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

export default Kukkavoi;