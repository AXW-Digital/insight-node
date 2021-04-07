import React  from 'react';
import {ReactComponent as Team} from '../../assets/images/team.svg'
import { Card } from 'react-bootstrap';


class Kasvuvaikkuttajat extends React.Component {
    render() {
        return (
            <div>
                  <section id="kasvut" className="d-flex align-items-center">
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1">
                            <h3>MIKÄ ON KASVUVAIKUTTAJAT.FI</h3>
                            <p>Kasvuvaikuttajat ovat kuluttajista rakentuva yhteisö, joka pyrkii luomaan itselleen 
                            ja yhteisölleen parempaa ja elämyksellisempää tulevaisuutta. Kas
                            </p>

                            <h2>Erilaisia tutkimuksia</h2>
                            <p>Emme halua täyttää sähköpostiasi turhilla ilmoituksilla.</p>
                            <div className="icon-box">
                                <Card className="description shadow-lg p-3 mb-5 bg-white rounded " data-aos="flip-up" data-aos-duration="200" data-aos-delay="300">
                                Kasvuvaikuttajana pääset testaaman kumppaniemme uusia tuotteita ja palveluita ensimmäisenä.
                                </Card>
                            </div>
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2 kasvut-img">
                            <div className="img-fluid animated">
                                <Team />
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Kasvuvaikkuttajat;