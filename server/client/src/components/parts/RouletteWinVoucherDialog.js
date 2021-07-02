import React, { useState, forwardRef, useImperativeHandle } from 'react'
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
    let history = useHistory();


    useImperativeHandle(ref, () => ({

        handleClickOpen() {
            setOpen(true);
        }
        

    }));



    const handleClose = () => {
        setOpen(false);
        history.push('/test');
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
                        backgroundImage: `url(${ConfettiBg})` ,
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
