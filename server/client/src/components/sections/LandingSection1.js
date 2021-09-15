import React from 'react';
import { ReactComponent as Nainen } from '../../assets/images/nainen.svg';
import HomeStepper from '../parts/HomeStepper';
import Loader from '../parts/Loader';


class LandingSection1 extends React.Component {

    renderContent() {
        const data = this.props.data
        switch (data.auth) {
            case null:
                return null
            case false:
                return (<div className="col-lg-6 pt-5 pt-lg-0 order-1 order-lg-1">
                    <h1>Olet vaikuttava!</h1>
                    <p> Vaikuttava-yhteisön jäsenenä autat yrittäjiä ymmärtämään paremmin asiakkaiden toiveita ja tarpeita ja näin
                        edesautat heitä kehittämään entistä vaikuttavampia tuotteita ja palveluja. </p>
                    <p>Vastineeksi mielipiteistäsi saat palkintoja:
                        lahjakortteja, alennuksia, etuja ja tarjouksia. </p>
                    <p>Ole mukana muokkaamassa tulevaisuutta!</p>
                    <a href="/signin" className="btn-get-started scrollto">Kirjaudu</a>
                    <a href="/signup" className="btn-get-rekister scrollto">Rekisteröidy</a>
                </div>);
            default:
                switch (data.profile) {
                    case null:
                        return <Loader />
                    case false:
                        return (
                            <div className="col-lg-6 pt-5 pt-lg-0 order-1 order-lg-1">
                                <HomeStepper startStep={1} />
                            </div>
                        )
                    default:
                        return (<div className="col-lg-6 pt-5 pt-lg-0 order-1 order-lg-1">
                            <h1>Hei {data.profile.fName}, <br /> olet vaikuttava!</h1>
                            <p>Kasvuvaikuttajana autat luomaan parempaa ymmärrystä elämyspuolen palveluista.
                            Jatka tästä vaikuttamaan!</p>
                            <a href="/home" className="btn-get-started scrollto">Jatka</a>
                        </div>);

                }
        }
    }

    renderSteps() {
        const auth = this.props.data.auth

        switch (auth) {

            case false:
                return (
                    <div>
                        <h2>Näin helppoa se on:</h2>
                        <HomeStepper startStep={0} />
                    </div>
                )

            case null:
                <Loader />

            default:
                return (
                    <div className="img-fluid animated">
                        <Nainen />
                    </div>
                )

        }
    }

    render() {
        return (
            <div>
                <section id="hero" className="d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            {this.renderContent()}
                            <div className="col-lg-6 order-2 order-lg-2 hero-img">
                                {this.renderSteps()}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default LandingSection1;