import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import KyselyForm from '../forms/KyselyForm';


class HomeQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questionForm: ['juoma', 'ruoka', 'rafla'],
            viewForm: false,
            viewButtons: true,
        };

        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.buttonList = this.buttonList.bind(this);
        this.kyselyForm = null;
        this.buttons = null
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
                    <div className = 'container d-flex h-75 align-items-center justify-content-center'>
                        <div className='row d-flex'>
                            <div className='col-md-12 col-lg-4 d-flex justify-content-center my-3'>
                                <div 
                                onClick={() => { this.onButtonClicked(questionForm[0]); hideButtons() }}
                                className="btn btn-lg btn-block text-uppercase btn-nosto"
                                >{questionForm[0]}</div>
                            </div>
                            <div className='col-md-12 col-lg-4 d-flex justify-content-center my-3'>
                                <div 
                                onClick={() => { this.onButtonClicked(questionForm[1]); hideButtons() }}
                                className="btn btn-lg btn-block text-uppercase btn-nosto"
                                >{questionForm[1]}</div>
                            </div>
                            <div className='col-md-12 col-lg-4 d-flex justify-content-center my-3'>
                                <div 
                                onClick={() => { this.onButtonClicked(questionForm[2]); hideButtons() }}
                                className="btn btn-lg btn-block text-uppercase btn-nosto"
                                >{questionForm[2]}</div>
                            </div>
                        </div>
                        </div>
                    
                )
            case false:
                return null
        }

    }

    onButtonClicked(n) {
        switch (n) {
            case "juoma":
                this.kyselyForm = <KyselyForm
                    question={1}
                    {...this.props} />
                break;
            case "ruoka":
                this.kyselyForm = <KyselyForm
                    question={2}
                    {...this.props} />
                break;
            case "rafla":
                this.kyselyForm = <KyselyForm
                    question={3}
                    {...this.props} />
                break;
            default:
                this.kyselyForm = null;
        }
        this.setState({ viewForm: true });
    }



    // renderContent() {
    //     return (
    //         <KyselyForm
    //             question={1}
    //             {...this.props} />
    //     )

    // }



    render() {
        const { questionForm } = this.state




        return (
            <div>                
                <div id="home-question" className="justify-content-center even-section ">
                <div className = 'row d-flex justify-content-center pt-4'>
                  <div className = 'text-centered'>
                          <h2>Oma arvostelu</h2>
                  </div>
                  </div>
                        {this.buttonList()}

                        {(this.state.viewForm) ?
                        <div className="row d-flex justify-content-center mx-2 mx-lg-5 mt-5 mb-5">
                            {this.kyselyForm}
                        </div> : ''}

                    
                </div>
            </div>
        );
    }
}

export default HomeQuestion;