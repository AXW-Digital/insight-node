import React from 'react';
import {ReactComponent as Nainen } from '../../assets/images/nainen.svg';


class Vaikuttava extends React.Component {
    
    greetings = (e) => {
        alert('get started')
    }

    render() {
        return (
            <div>
                <div id='page-top'></div>
                  <section id="hero" className="d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-2">
                                <h1>Olet vaikuttava!</h1>
                                <p>Kasvuvaikuttajana autat luomaan parempaa ymmärrystä elämyspuolen palveluista.
                                    Ole mukana muokkaamassa tulevaisuutta!</p>
                                <a href="/signin" onClick={this.greetings} className="btn-get-started scrollto">Kirjaudu</a>
                                <a href="/signup" onClick={this.greetings} className="btn-get-rekister scrollto">Rekisteröidy</a>
                            </div>
                            <div className="col-lg-6 order-1 order-lg-1 hero-img">
                                <div className="img-fluid animated">
                                    <Nainen />
                                </div>
                            </div>
                        </div>
                        </div>
                    </section>
            </div>
        );
    }
}

export default Vaikuttava;