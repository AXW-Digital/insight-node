/* eslint-disable */
import React  from 'react';
import {ReactComponent as Thoughts} from '../../assets/images/thoughts.svg'
import { Card } from 'react-bootstrap';


class LandingSection4 extends React.Component {
    render() {
        return (
            <div>
                  <section className="d-flex align-items-center even-section">
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1">
                            <h3 className='text-uppercase'>Mihin sitoudun ja mitä vaatii minulta?</h3>
                            <p>Voit vastata kyselyihin ja tutkimuksiin oman aikataulusi ja kiinnostuksesi mukaan. 
                            </p>
                            <p>Voit itse poistaa tilisi yhdellä näpäytyksellä, mikäli haluat lopettaa vaikuttavan urasi ja eläköityä. 
                            </p>
                            <p>Tietoturva ja yhteisymmärrys ovat meille tärkeitä. Emme spämmää, emmekä jaa tietojasi ulkopuolisille toimijoille tai kolmansille osapuolille.</p>


                        </div>
                        <div className="col-lg-6 order-1 order-lg-2 kasvut-img">
                            <div className="img-fluid animated">
                                <Thoughts />
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default LandingSection4;