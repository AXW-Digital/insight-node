import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import KyselyForm from '../forms/KyselyForm'


class HomeQuestion extends React.Component {

    renderContent() {
        return (            
                <KyselyForm 
                question={1}
                {...this.props} />           
        )

    }



    render() {
        return (
            <div>
                <div id="home-question" className="d-flex justify-content-center even-section ">
                    <div className="container-fluid mx-lg-5 mt-5 mb-5">

                            {this.renderContent()}

                    </div>
                </div>
            </div>
        );
    }
}

export default HomeQuestion;