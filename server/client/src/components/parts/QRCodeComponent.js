import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { Button as Btn } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import Loader from '../parts/Loader'

class QRCodeComponent extends Component {
    state = {
        loading: false,
        activated: false
    };

    enterLoading = () => {
        this.setState({ loading: true })
        setTimeout(() => {
            this.setState({
                loading: false,
                activated: true
            })

        }, 3000);
    };


    render() {
        const { loading } = this.state;
        return (
            <>
                <div className='row d-flex  align-items-center'>
                    <div className='col-12 d-flex justify-content-center'>
                        {   
                            this.state.activated === false && this.state.loading === false ?
                                <div className='card'>
                                    Placeholder
                                </div>
                            :this.state.loading ?
                                <div className='qr-loader'>
                                    <Loader/>
                                </div>
                            :this.state.activated && this.state.loading === false ?
                                <div>
                                    <QRCode {...this.props} className='p-2 qr-code-background' />
                                    <div className='col-12 d-flex justify-content-center'>
                                        <p className='qr-code-value justify-content-center text-center text-uppercase'>
                                            {this.props.value}
                                        </p>

                                    </div>
                                </div>

                            :
                            null
                        }


                    </div>
                    <br />
                    <div className='col-12 d-flex justify-content-center'>
                        <Btn
                            type="primary"
                            onClick={() => this.enterLoading()}
                            disabled={this.state.activated ? true : false}
                        >
                         {   
                            this.state.activated === false ?
                            'Aktivoi'
                            :this.state.activated && this.state.loading === false ?
                            'Aktivoitu'
                            :
                            null
                        }   
                        </Btn>
                    </div>
                </div>
            </>
        );
    }



}

export default QRCodeComponent;