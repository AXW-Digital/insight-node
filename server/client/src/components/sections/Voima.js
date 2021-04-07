import React from 'react';
import {ReactComponent as Powerful} from '../../assets/images/powerful.svg'
import { Card } from 'react-bootstrap'


class Voima extends React.Component {
    render() {
        return (
            <div>
                <section id="voima" className="d-flex align-items-center bg-white">
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1">
                        <h3>KASVUVAIKUTTAJIEN VOIMA</h3>
                            <div className="icon-box">
                                <Card className="description shadow-lg p-3 mb-5 bg-white rounded" data-aos="flip-up" data-aos-duration="200" data-aos-delay="300">
                                Ravintolan raaka-aineiden lähituotannon osuus kasvoi 40%
                                </Card>
                            </div>
                            <div className="icon-box">
                                <Card className="description shadow-lg p-3 mb-5 bg-white rounded" data-aos="flip-up" data-aos-duration="200" data-aos-delay="300">
                                Ravintolan raaka-aineiden lähituotannon osuus kasvoi 40%
                                </Card>
                            </div>
                            
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2 voima-img">
                            <div className="img-fluid animated">
                                <Powerful />
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
                
            </div>
        );
    }
}

export default Voima;