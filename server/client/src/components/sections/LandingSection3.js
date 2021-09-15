import React  from 'react';
import {ReactComponent as Team} from '../../assets/images/team.svg'
import { Card } from 'react-bootstrap';


class LandingSection3 extends React.Component {
    render() {
        return (
            <div>
                  <section className="d-flex align-items-center odd-section">
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1">
                            <h3>MIKÄ ON VAIKUTTAVA.IO</h3>
                            <p>Vaikuttava.io on Growflow Insightsin luoma kuluttajayhteisö, joka pyrkii luomaan meille kaikille parempaa ja elämyksellisempää tulevaisuutta.
                            </p>

                            <h2>Erilaisia tutkimuksia</h2>
                            <p>Toteutamme asiakkaidemme toiveiden mukaisesti erilaisia tutkimuksia yhteisön voimalla.</p>
                            <div className="icon-box">
                                <Card className="description shadow-lg p-3 mb-5 bg-white rounded " data-aos="flip-up" data-aos-duration="200" data-aos-delay="300">
                                Arvioi uutuustuotteita, kerro ravintolakokemuksiasi ja ratkaistaan nyt yhdessä vihdoin ja viimein kuuluvatko ananakset pitsaan!
                                </Card>
                            </div>
                            <p className='font-weight-bold'> ruoka ❘ ravintola ❘ hotelli ❘ tapahtuma ❘ elämys </p>
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

export default LandingSection3;