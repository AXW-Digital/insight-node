import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { yellow } from '@material-ui/core/colors';
import Countdown from "react-countdown";
import VoucherModal from '../parts/VoucherModal'

const useStyles = makeStyles((theme) => ({
    breakpoints: {
        values: {
            xs: 0,
            sm: 765,
            sm2: 767,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    root: {
        maxWidth: "min(90vw, 350px)",
        minWidth: "min(90vw, 350px)",
        margin: 'auto',
        height: 215,
        backgroundColor: 'white',
    },
    media: {
        height: 125,
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        fontSize: '18px',
        top: '75px',
        left: '5%',
        fontWeight: 1000,
        fontFamily: "'TT Norms' !important",
        color: '#363a59', // theme.palette.getContrastText(yellow['A400'])
        backgroundColor: '#FFE400' // yellow['A400']
    },
    title: {
        color: 'rgba(63, 61, 86, 1) !important',
        fontFamily: "'TT Norms' !important",
        marginTop: '-15px !important',
        fontSize: 'min(18px, 4.5vw) !important',
        fontWeight: 'bold !important',
    },
    text: {
        fontSize: 'min(12px, 3.5vw) !important',
        color: 'rgba(63, 61, 86, 1) !important',
        marginTop: '-25px !important',
        whiteSpace: 'nowrap !important',
        overflow: 'hidden !important',
        textOverflow: 'ellipsis !important'
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
    action: {
        zIndex: '1 !important'
    },
    content: {
        marginTop: '15px',
        paddingTop: 0,
        paddingBottom: 0,
        [theme.breakpoints.down('sm')]: {
            paddingTop: 16,
            paddingBottom: 16,
        },

    },
    date: {
        color: 'lightgray !important',
        marginTop: '-12px !important',
        position: 'relative',
        fontSize: '12px',
        whiteSpace: 'nowrap !important'
    },
    line: {
        padding: 0,
        margin: 0,
        position: 'relative',
        top: '-15px'
    }
}));



export default function VoucherCard(props) {
    const classes = useStyles();

    // Expiry component
    const Completionist = () => <span>Ei voimassa!</span>;
    const [modalShow, setModalShow] = React.useState(false);

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <Completionist />;
        } else {
            // Render a countdown
            return (
                <span>
                    {days}:{hours}:{minutes}:{seconds}
                </span>
            );
        }
    };


    return (
        <>
            <div className="my-2  col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12" key={props.key}>
                <Card className={classes.root}>

                    {/* Check if card is valid and render a clickable card or disabled card */}
                    {(Date.now() - props.dateStart) < props.valid ?

                        // Card valid render
                        <CardActionArea onClick={() => setModalShow(true)}>
                            <CardMedia
                                className={classes.media}
                                image={props.picUrl}
                                title={props.formTitle}
                            >
                                <Avatar className={classes.large}>
                                    {props.benefit}
                                </Avatar>

                            </CardMedia>
                            <div className='row'>
                                <div className='col-8 pr-0 content-col'>
                                    <CardContent className={classes.content}>
                                        <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                            {props.formTitle}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
                                            {props.formText}
                                        </Typography>
                                    </CardContent>
                                </div>
                                <div className='col-4 px-0'>
                                    <CardActions className={classes.action}>
                                        <Button
                                            variant='contained'
                                            href={props.formUrl}
                                            className={classes.button}
                                            onMouseDown={event => event.stopPropagation()}
                                            onClick={event => {
                                                event.stopPropagation();
                                                event.preventDefault();
                                                console.log("Button clicked");
                                            }}
                                        >AKTIVOI
                                        </Button>
                                    </CardActions>
                                </div>
                            </div>
                            <hr className={classes.line} />
                        </CardActionArea>
                        // end Card valid render

                        // card not valid render
                        :
                        <>
                            <div className='voucher-invalid'>
                                <CardMedia
                                    className={classes.media}
                                    image={props.picUrl}
                                    title={props.formTitle}
                                >
                                    <Avatar className={classes.large}>
                                        {props.benefit}
                                    </Avatar>

                                </CardMedia>
                                <div className='row'>
                                    <div className='col-8 pr-0 content-col'>
                                        <CardContent className={classes.content}>
                                            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                                {props.formTitle}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
                                                {props.formText}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    <div className='col-4 px-0'>
                                        <CardActions className={classes.action}>
                                            <Button
                                                variant='contained'
                                                href={props.formUrl}
                                                className={classes.button}
                                            >AKTIVOI
                        </Button>
                                        </CardActions>
                                    </div>
                                </div>
                            </div>
                        </>
                        // end card not valid render
                    }
                    {/* end valid check */}

                    {/* Render rest of card */}
                    <div className='row ml-1'>
                        <div className='col-6'>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.date}>
                                Lisätty: {Intl.DateTimeFormat('fi').format(props.startDate)}
                            </Typography>
                        </div>
                        <div className='col-6'>
                            <div className='text-right mr-3'>
                                <Typography variant="body2" color="textSecondary" component="p" className={classes.date}>
                                    <Countdown date={props.dateStart + props.valid} renderer={renderer} />
                                </Typography>
                            </div>
                        </div>
                    </div>
                    {/* end Render rest of card */}


                </Card>
            </div>
            <VoucherModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                {...props}
            />

        </>
    );
}

