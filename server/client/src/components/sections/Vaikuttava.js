import React from 'react';
import { ReactComponent as Nainen } from '../../assets/images/nainen.svg';


class Vaikuttava extends React.Component {

    renderContent() {
        const data = this.props.data
        switch (data.auth) {
            case null:
                return null
            case false:
                return (<div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-2">
                    <h1>Olet vaikuttava!</h1>
                    <p>Kasvuvaikuttajana autat luomaan parempaa ymmärrystä elämyspuolen palveluista.
                    Ole mukana muokkaamassa tulevaisuutta!</p>
                    <a href="/signin"  className="btn-get-started scrollto">Kirjaudu</a>
                    <a href="/signup"  className="btn-get-rekister scrollto">Rekisteröidy</a>
                    </div>);
            default:
                return (<div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-2">
                    <h1>Hei {data.profile.fName}, <br/> olet vaikuttava!</h1>
                    <p>Kasvuvaikuttajana autat luomaan parempaa ymmärrystä elämyspuolen palveluista.
                    Jatka tästä vaikuttamaan!</p>
                    <a href="/home" className="btn-get-started scrollto">Jatka</a>
                </div>);
        }

    }

    render() {
        return (
            <div>
                <div id='page-top'></div>
                <section id="hero" className="d-flex align-items-center">
                    <div className="container">
                        <div className="row">

                            {this.renderContent()}

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