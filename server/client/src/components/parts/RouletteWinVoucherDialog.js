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



    const reduceCoupons = async () => {



        const userId = props.data.profile._user


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

        await couponService.sendCoupon(coupons)

        return('done')

       



    }








    let history = useHistory();


    useImperativeHandle(ref, () => ({

        handleClickOpen() {
            setOpen(true);
        }


    }));


    const closeWin = async () => {
        const res = await reduceCoupons();
        setOpen(false)
        history.push('/test');
        window.location.reload(false);
    }

    const handleClose = () => {
        closeWin();
       

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
