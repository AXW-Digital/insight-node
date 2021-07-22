import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Zoom from '@material-ui/core/Zoom';
import { Button } from 'react-bootstrap';
import ConfettiBg from '../../assets/images/confetti_bg.jpg';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import keys from '../../config/keys';
import storeReducer from '../../reducers/storeReducer';
import { configureStore } from '@reduxjs/toolkit';
import { prizeService } from '../../functions/prizeNumberGen';
import { couponService } from '../../functions/couponReduce';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        fontFamily: 'TT Norms',
        color: 'white'
    },
    button: {
        fontFamily: 'TT Norms',
        margin: '17px'
    }
}));

const Transition = forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

const RouletteWinVoucherDialog = forwardRef((props, ref) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [voucherData, setVoucherData] = useState(null)
    const [voucherSent, setVoucherSent] = useState(false)
    const [couponSent, setCouponSent] = useState(false)
    const [voucherNum, setVoucherNum] = useState(0)


    const subscription = prizeService.onNumber().subscribe(number => {
        if (number) {
            setVoucherNum(number)
        } else {
            setVoucherNum(null)
        }

    })



    const postVoucher2 = async (data) => {
        try {
            const { res } = await axios.post('../api/vouchers', data);
            console.log(res)
            return res;
        } catch (err) {
            console.log(err.message);
        }
    }

    const postCoupon2 = async (coupons) => {
        try {
            const { res } = await axios.post('/api/profile/coupons', coupons);
            console.log(res)
            return res;
        } catch (err) {
            console.log(err.message);
        }
    }


    async function postVoucher(data) {
        const url = '../api/vouchers'
        await axios.post(url, data)
            .then((res1) => {
                console.log(res1.status)
                setVoucherSent(true)
                return res1
            })
    }

    // async function postVoucher(data, coupons) {
    //     axios.all([
    //         await axios.post('../api/vouchers', data),
    //         await axios.post('../api/profile/coupons', coupons)
    //       ])
    //       .then(axios.spread((res1, res2) => {
    //         console.log('res1: ', res1, 'res2: ', res2)
    //       }))
    // };

    async function postCoupon() {

        var bronzeCoupons, silverCoupons, goldCoupons
        bronzeCoupons = silverCoupons = goldCoupons = 0
        switch (props.couponType) {
            case 'bronze':
                bronzeCoupons = -1
                break
            case 'silver':
                silverCoupons = -1
                break
            case 'gold':
                goldCoupons = -1
                break
            default:
                bronzeCoupons = silverCoupons = goldCoupons = 0
                break
        }

        var coupons = { bronzeCoupons, silverCoupons, goldCoupons }

        couponService.sendCoupon(coupons)
        

        axios.post('/api/profile/coupons', coupons, {timeout: 3000})
            .then(res => {
                if (res.status === 200) {
                    console.log(res + 'coupon sent')
                    setCouponSent(true)
                    return res
                }

            })
            .catch(err => {
                console.log(err)
            })
    }

    const reduceCoupons = () => {



        const userId = props.data.profile._user
        const voucherId = voucherNum



        var bronzeCoupons, silverCoupons, goldCoupons
        bronzeCoupons = silverCoupons = goldCoupons = 0
        switch (props.couponType) {
            case 'bronze':
                bronzeCoupons = -1
                break
            case 'silver':
                silverCoupons = -1
                break
            case 'gold':
                goldCoupons = -1
                break
            default:
                bronzeCoupons = silverCoupons = goldCoupons = 0
                break
        }



        var coupons = { userId, bronzeCoupons, silverCoupons, goldCoupons }

        couponService.sendCoupon(coupons)

       



        if (!voucherSent) {
            const {
                partnerId,
                benefitValue,
                benefitType,
                name
            } = props.voucherReg[voucherId]


            const data = {
                userId,
                voucherId,
                partnerId,
                benefitValue,
                benefitType,
                name
            }


            postVoucher(data)
            setVoucherSent(true)
            postCoupon(coupons)

            

        }
    }








    let history = useHistory();


    useImperativeHandle(ref, () => ({

        handleClickOpen() {
            setOpen(true);
        }


    }));



    const handleClose = () => {
        reduceCoupons();
        setOpen(false);
        history.push('/test');
        // postCoupon();
        window.location.reload(false);

    };

    return (
        <div>
            <Dialog
                className='roulette-dialog'
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                {...props}
                PaperProps={{
                    style: {
                        backgroundImage: `url(${ConfettiBg})`,
                        boxShadow: 'none',
                        objectFit: 'cover'
                    },
                }}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h5" className={classes.title}>
                            Onnittelut!
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className='row d-flex'>
                    <div className='col-12'>
                        {props.voucher}
                    </div>
                </div>
                <Button autoFocus color="inherit" onClick={handleClose} className={classes.button}>
                    Tallenna
                </Button>
            </Dialog>
        </div>
    );
});

export default RouletteWinVoucherDialog
