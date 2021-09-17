/* eslint-disable */
import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { KyselyFormBoost as KyselyForm } from '../forms/KyselyForm';
import axios from 'axios';
import keys from '../../config/keys';


class HomeQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questionForm: ['juoma', 'ruoka', 'rafla'],
            viewForm: false,
            viewButtons: true,
            boosts: null
        };

        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.buttonList = this.buttonList.bind(this);
        this.kyselyForm = null;
        this.buttons = null
    }

    async componentDidMount() {
        await axios.get('/api/boosts').then(res => {
            const boosts = res.data

            boosts.sort(function (a, b) {
                return a.order - b.order;
            });


            this.setState({
                boosts
            })

        })
    }

    buttonList() {
        const { questionForm, viewButtons } = this.state

        const hideButtons = () => {
            this.setState(
                { viewButtons: false }
            )
        }

        switch (viewButtons) {
            case true:
                return (
                    <>
                        <div className='container d-flex h-75 align-items-center justify-content-center'>
                            <div className='row d-flex'>
                                {this.state.boosts !== null ?
                                    <>
                                    <div className='col-md-12 col-lg-12 my-3'>

                                    <p>Söitkö tai joitko hyvin, kävitkö ravintolassa? Löysitkö elämäsi annoksen, uuden ihanan juomatuttavuuden tai jäikö jotakin hampaan koloon lounaalla
                            tai illallisella?</p>
                        <p>Arvostele ruoka- juoma- tai ravintolakokemus ja kerro meille mistä pidit, mitä parantaisit tai mitä suosittelisit muille Vaikuttaville.
                            Voit tehdä arvosteluja vaikka joka päivä.</p>


                                    </div>
                                        <div className='col-md-12 col-lg-4 d-flex justify-content-center my-3'>
                                            <div
                                                onClick={() => { this.onButtonClicked(0); hideButtons() }}
                                                className="btn btn-lg btn-block text-uppercase btn-nosto"
                                            >{this.state.boosts[0].kyselyTitle}</div>
                                        </div>
                                        <div className='col-md-12 col-lg-4 d-flex justify-content-center my-3'>
                                            <div
                                                onClick={() => { this.onButtonClicked(1); hideButtons() }}
                                                className="btn btn-lg btn-block text-uppercase btn-nosto"
                                            >{this.state.boosts[1].kyselyTitle}</div>
                                        </div>
                                        <div className='col-md-12 col-lg-4 d-flex justify-content-center my-3'>
                                            <div
                                                onClick={() => { this.onButtonClicked(2); hideButtons() }}
                                                className="btn btn-lg btn-block text-uppercase btn-nosto"
                                            >{this.state.boosts[2].kyselyTitle}</div>
                                        </div>
                                    </>
                                    : null}
                            </div>
                        </div>
                    </>
                )
            case false:
                return null
        }

    }

    onButtonClicked(n) {
        switch (n) {
            case 0:
                this.kyselyForm = <KyselyForm
                    question={this.state.boosts[0].surveyId - 1}
                    {...this.props} />
                break;
            case 1:
                this.kyselyForm = <KyselyForm
                    question={this.state.boosts[1].surveyId - 1}
                    {...this.props} />
                break;
            case 2:
                this.kyselyForm = <KyselyForm
                    question={this.state.boosts[2].surveyId - 1}
                    {...this.props} />
                break;
            default:
                this.kyselyForm = null;
        }
        this.setState({ viewForm: true });
    }




    render() {
        const { questionForm } = this.state




        return (
            <div>
                <div id="home-question" className="justify-content-center even-section ">
                    <div className='row d-flex justify-content-center pt-4'>
                        <div className='text-centered'>
                            <h2>Oma arvostelu</h2>
                        </div>
                    </div>
                    {this.buttonList()}

                    {(this.state.viewForm) ?
                        <div className="d-flex home-kysely-form justify-content-center mx-2 mx-lg-5 mt-5 mb-5">
                            {/* <div className = 'row justify-content-center'> */}
                            <div className='col-12'>
                                {this.kyselyForm}
                            </div>
                            {/* </div> */}
                        </div> : ''}


                </div>
            </div>
        );
    }
}

export default HomeQuestion;