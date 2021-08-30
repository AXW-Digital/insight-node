import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { Button as Btn } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import Loader from '../parts/Loader'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { motion } from "framer-motion";
import cryptoRandomString from 'crypto-random-string';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ProgressBarMUI from './ProgressBarMUI'
// Animation
import { easeLinear } from "d3-ease";
import AnimatedProgressProvider from "../parts/AnimatedProgressProvider";
import { Progress } from 'antd';
import LinearProgress from '@material-ui/core/LinearProgress';
import Countdown from "react-countdown";
import { BiTimer, BiCalendarCheck } from 'react-icons/bi';
import Reward from "react-rewards";

import axios from 'axios';
import keys from '../../config/keys';



const LoadingSquareComponent = () => (
    <motion.div
        animate={{
            scale: [1, 1, 1],
            rotate: [-270, 0, -270],
            borderRadius: ['4%', "50%", '4%']
        }}
        transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: 1,
            repeatDelay: 0.5
        }}
    />
)

const useStyles = makeStyles((theme) => ({

    root: {
        animationDuration: '550ms',
        left: 0,
        display: 'flex',
        position: 'absolute',
        zIndex: 10,
        marginLeft: '27px',
        marginTop: '14px'

    },
    circle: {
        strokeLinecap: 'round',
        backgroudnColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
    },
    progress: {
        width: '100%',
    }

}));





function CircularIndeterminate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress
                size={100}
                classes={{
                    circle: classes.circle,
                }}
            />
        </div>
    );
}

async function redeemVoucher(id, userId, qrCode){

    const voucherId = id
    const data = {
        userId,
        voucherId,
        qrCode
    }
    await axios.post(keys.localUrl + '/api/vouchers/reg/redeem', data)
    .then(res => {
        console.log(res)
    })
    .catch(err =>{
        console.log(err)
    })

}
class QRCodeComponent extends Component {
    state = {
        loading: false,
        activated: false
    };

    

    enterLoading = () => {
        redeemVoucher(this.props.voucherId, this.props.data.profile._user, this.props.qr_code);
        this.setState({ loading: true })
        setTimeout(() => {
            this.setState({
                loading: false,
                activated: true
            })
            this.reward.rewardMe();

        }, 2000);
    };

    render() {

       
        function DisplayTime(time) {
            var d = new Date(time.time)
            var min = "0" + d.getMinutes()
            var sec = "0" + d.getSeconds()
            switch (time) {
                default:
                    return (

                        <div className='row'>
                            <div className='col-6 qr-countdown'>
                                Voimassa
                            </div>
                            <div className='col-6 justify-content-end text-right'>
                                <div className='qr-countdown'>
                                    {min.substr(-2)}:{sec.substr(-2)}
                                </div>
                            </div>
                        </div>
                    )
                case 0:
                    return (
                        <div className='qr-countdown'>
                            Ei voimassa
                        </div>
                    )

            }


        }


        // var qr_code = cryptoRandomString({ length: 10 })
        const durationValid = 10
        const { loading } = this.state;
        return (
            <>
                <div className='row d-flex  align-items-center qr-parent'>
                    <div className='col-12 d-flex justify-content-center '>
                        {
                            this.state.activated === false && this.state.loading === false ?
                                null
                                : this.state.loading ?
                                    <div className='row justify-content-center'>
                                        <div className='qr-loading-box'>
                                            <CircularIndeterminate color='#dedede' />
                                            <div className='qr-loader'>
                                                <LoadingSquareComponent key={99} />
                                            </div>
                                            <div className='col-12 d-flex justify-content-center'>
                                                <SkeletonTheme color="#fffcfc" highlightColor="#dedede">
                                                    <p className='mt-4 qr-code-value justify-content-center text-center text-uppercase'>
                                                        <Skeleton />
                                                    </p>
                                                </SkeletonTheme>
                                            </div>
                                        </div>
                                    </div>
                                    : this.state.activated && this.state.loading === false ?
                                        <div className='row justify-content-center'>
                                            <QRCode {...this.props} className='p-2 qr-code-background' />
                                            <div className='col-12 d-flex justify-content-center'>
                                                <p className='mt-4 qr-code-value justify-content-center text-center text-uppercase'>
                                                    {this.props.value}
                                                </p>
                                            </div>
                                            <div className='row d-flex'>
                                                <div className='col-12'>
                                                    <AnimatedProgressProvider
                                                        valueStart={0}
                                                        valueEnd={100}
                                                        duration={durationValid}
                                                        easingFunction={easeLinear}
                                                    >
                                                        {value => {
                                                            return (
                                                                <div>
                                                                    {value < 100 ?
                                                                        <div>
                                                                            <Progress
                                                                                strokeColor={{
                                                                                    from: '#108ee9',
                                                                                    to: '#87d068',
                                                                                }}
                                                                                percent={value}
                                                                                status="active"
                                                                                showInfo={false}
                                                                            />
                                                                            <p><DisplayTime time={parseInt((durationValid * 1000) - (value * durationValid * 10))} /></p>
                                                                        </div>
                                                                        :
                                                                        <div className = 'qr-countdown-done'>
                                                                        <Progress percent={100} />
                                                                        <p className = 'qr-countdown-done'>Lunastettu</p>
                                                                        </div>
                                                                    }

                                                                </div>
                                                            );
                                                        }}

                                                    </AnimatedProgressProvider>
                                                </div>
                                                
                                            </div>
                                        </div>

                                        :
                                        null
                        }


                    </div>
                    <br />
                    <div className='col-12 d-flex justify-content-center qr-btn'>
                       
                            {
                                this.state.activated === false ?
                                <Btn
                                type="primary"
                                onClick={() => this.enterLoading()}
                                disabled={this.state.activated ? true : false}
                                className='mt-0'
                                size='large'
                                >
                                    Aktivoi
                                    

                                </Btn>
                                
                                : this.state.activated && this.state.loading === false ?
                                    <div className = 'justify-content-center align-items-center'> 
                                    <Reward
                                        ref={ref => {
                                            this.reward = ref;
                                        }}
                                        type="memphis"
                                    >
                                    <Btn
                                        type="primary"
                                        onClick={() => this.enterLoading()}
                                        disabled={this.state.activated ? true : false}
                                        className='mt-0'
                                        size='large'
                                    >
                                    Aktivoitu
                                    </Btn>
                                    </Reward>
                                    </div>
                                    :
                                    null
                            }
                        
                    </div>
                </div>
            </>
        );
    }



}

export default QRCodeComponent;