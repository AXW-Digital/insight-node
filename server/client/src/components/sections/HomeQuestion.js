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
                    <>
                        <div className='row align-items-center'>
                            <div className='col-4 d-flex justify-content-center'>
                                <button onClick={() => { this.onButtonClicked(questionForm[0]); hideButtons() }}>{questionForm[0]}</button>
                            </div>
                            <div className='col-4 d-flex justify-content-center'>
                                <button onClick={() => { this.onButtonClicked(questionForm[1]); hideButtons() }}>{questionForm[1]}</button>
                            </div>
                            <div className='col-4 d-flex justify-content-center'>
                                <button onClick={() => { this.onButtonClicked(questionForm[2]); hideButtons() }}>{questionForm[2]}</button>
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
                <div id="home-question" className="d-flex justify-content-center even-section ">
                    <div className="container-fluid mx-lg-5 mt-5 mb-5">
                        {this.buttonList()}

                        {(this.state.viewForm) ?
                            this.kyselyForm : ''}

                    </div>
                </div>
            </div>
        );
    }
}

export default HomeQuestion;