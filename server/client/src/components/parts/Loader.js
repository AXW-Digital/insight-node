import React, { Component } from 'react';
// import PuffLoader from "react-spinners/PuffLoader";
import { RotateSpinner } from "react-spinners-kit";

class Loader extends Component {
    render() {
        return (
            <div className='container-fluid vh-100 d-flex align-items-center justify-content-center'>
                <div className="row d-flex justify-content-center">
                    <RotateSpinner
                        size={120}
                        color={'#fdbc18ab'}
                        className='d-flex justify-content-center'
                    />
                </div>
            </div>
        );
    }
}

export default Loader;