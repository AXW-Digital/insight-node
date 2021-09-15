import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';



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
        marginTop: '5px !important',
        whiteSpace: 'nowrap !important',
        overflow: 'hidden !important',
        textOverflow: 'ellipsis !important'
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



    return (
        <>
            <div className = 'mt-5' key={props.key}>
                <Card className={classes.root}>
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
                    </div>

                </Card>
            </div>



        </>
    );
}

