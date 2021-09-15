import React from 'react';
import { ReactComponent as Nainen } from '../../assets/images/nainen.svg';
import { KyselyFormLanding } from '../forms/KyselyForm'


class LandingQuestion extends React.Component {

    renderContent() {
        const data = this.props.data
        switch (data.auth) {
            case null:
                return null
            case false:
                return (
                <>
                <div className="col-lg-5 pt-1 pt-lg-0 order-1 order-lg-1 ">
                    <h3>Vastaa maailmaa jakaviin kysymyksiin ja liity vaikuttavan yhteisöön</h3>
                    <p> Liity mukaan ja voita lahjakortteja </p>
                </div>
                <div className="col-lg-7 pt-1 pt-lg-0 order-1 order-lg-1 ">
                    <KyselyFormLanding question = {3}/>
                </div>
                </>);
            default:
                switch (data.profile) {
                    case null:
                        return null
                    default:
                        return (<>
                            <div className="col-lg-5 pt-1 pt-lg-0 order-1 order-lg-1 ">
                                <h1>Vastaa maailmaa jakaviin kysymyksiin ja liity vaikuttavan yhteisöön</h1>
                                <p> Liity mukaan ja voita lahjakortteja </p>
                            </div>
                            <div className="col-lg-7 pt-1 pt-lg-0 order-1 order-lg-1 ">
                                <KyselyFormLanding question = {3}/>
                            </div>
                            </>);

                }
        }

    }

    render() {
        return (
            <div>
                <div id='page-top'></div>
                <section id="landing-top" className="d-flex align-items-center even-section">
                    <div className="container-fluid mx-lg-5">
                        <div className="row">
                            {this.renderContent()}
                            <div className="col-lg-6 order-1 order-lg-1 hero-img">
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default LandingQuestion;