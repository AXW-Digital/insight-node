import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { Button as Btn } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import Loader from '../parts/Loader'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { motion } from "framer-motion"

const LoadingSquareComponent = () => (
  <motion.div
    animate={{
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}
    transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        loop: Infinity,
        repeatDelay: 1
      }}
  />
)

const useStyles = makeStyles((theme) => ({

    root: {
        color: '#1a90ff',
        animationDuration: '550ms',
        left: 0,
        display: 'flex',
    },
    circle: {
        strokeLinecap: 'round',
        backgroudnColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
    },

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

        }, 5000);
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
                                : this.state.loading ?
                                
                                    <div className='qr-loader'>
                                        <LoadingSquareComponent className = 'bg-white' />
                                            {/* <CircularIndeterminate /> */}
                                    </div>
                                    : this.state.activated && this.state.loading === false ?
                                        <div className = 'row justify-content-center'>
                                            <QRCode {...this.props} className='p-2 qr-code-background' />
                                            <div className='col-12 d-flex justify-content-center'>
                                                <p className='mt-4 qr-code-value justify-content-center text-center text-uppercase'>
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
                                    : this.state.activated && this.state.loading === false ?
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