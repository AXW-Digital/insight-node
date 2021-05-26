import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Reward from "react-rewards";
import Countdown from "react-countdown";
import { connect } from 'react-redux';
import QRCodeComponent from './QRCodeComponent';
import cryptoRandomString from 'crypto-random-string';




var qr_code = cryptoRandomString({length: 10})
console.log(qr_code)





const useStyles = makeStyles((theme) => ({
    dialog: {
        backgroundColor: '#363a59 !important'
    },
    appBar: {
        position: 'relative',
        backgroundColor: '#edbf07 !important',
        color: '#363a59'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        fontFamily: 'TT Norms'
    },
    button: {
        fontWeight: 'bold',
        backgroundColor: '#363a59 !important',
        color: 'white',
        paddingLeft: 'min(16px, 2vw)!important',
        paddingRight: 'min(16px, 2vw)!important',
        marginTop: '10px',
        fontFamily: "'TT Norms' !important",
        zIndex: '10 !important'
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const VoucherActivateModal = (props) => {
    // Expiry component
    const Completionist = () => <span>Ei voimassa!</span>;
    // Renderer callback with condition
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <Completionist />;
        } else {
            return (
                <span>
                    {minutes}:{seconds}
                </span>
            );
        }
    }

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    

    return (
        <div>
            <Button
                        onClick={handleClickOpen}
                        centered
                        className='text-uppercase voucher-modal-activate'
                        size='lg'
                        block
                        style={{
                            zIndex: 999
                        }}
                    >
                        AKTIVOI
            </Button>
            <Dialog fullScreen open = {open} onClose={handleClose} TransitionComponent={Transition} {...props} PaperProps={{
                style: {
                    backgroundColor: '#363a59',
                    boxShadow: "none"
                },
            }}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {props.benefit} &nbsp; {props.benefitType}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className='container d-flex align-items-center justify-content-center vh-100'>
                    <QRCodeComponent value= {qr_code} />
                </div>
            </Dialog>
        </div>
    );
}

function mapStateToProps(data) {
    return { data };

}

export default connect(mapStateToProps)(VoucherActivateModal);

