import React, {useRef} from 'react';
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
import { useHistory } from "react-router-dom";









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
        fontFamily: 'TT Norms',
        fontWeight: 'bold'
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

    let history = useHistory();

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

    const closeBtnRef = useRef();
    
    
    
    
    const handleClickOpen = () => {
        setOpen(true);
        
    };

    const handleClose = async () => {
        // setOpen(false);
        if(closeBtnRef.current){
            closeBtnRef.current.setAttribute('disabled', 'disabled');
            // console.log('closing page...')
        }

        history.push('/test');
        // console.log('pushed to test...');
        await window.location.reload();
        // console.log('window reloaded...');
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
                        <IconButton edge="start" color="inherit" onClick={handleClose} ref={closeBtnRef} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h5" className={classes.title}>
                            {props.benefit} &nbsp; {props.benefitType}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className='container d-flex align-items-center justify-content-center vh-100'>
                    <QRCodeComponent 
                    value = {props.qr_code}
                    renderAs = 'svg'
                    {...props} 
                    />
                </div>
            </Dialog>
        </div>
    );
}

function mapStateToProps(data) {
    return { data };

}

export default connect(mapStateToProps)(VoucherActivateModal);

