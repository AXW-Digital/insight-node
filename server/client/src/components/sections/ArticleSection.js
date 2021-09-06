import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import randomMC from "random-material-color";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios'



export default function ArticleSection(props) {
    
    const useStyles = makeStyles((theme) => ({
        root: {
            minWidth: "min(75vw, 325px)",
            // maxWidth: '500px !important',
        },
        media: {
            height: 0,
            paddingTop: "56.25%", // 16:9
        },
        expand: {
            transform: "rotate(0deg)",
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
            }),
            overflow: 'auto'
        },
        expandOpen: {
            transform: "rotate(180deg)",
        },
        avatar: {
            backgroundColor: color,
        },
        headerTitle: {
            fontFamily: 'TT Norms !important',
            fontSize: '28px !important',
            color: '#363a59'
        },
        formText: {
            fontWeight: '700 !important',
            fontSize: '20px !important'
        },
        likeHeader:{
            zIndex:'10 !important'
        }
    }));


    var color = randomMC.getColor();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [like, setLike] = React.useState(false); //{ ...props.liked }
    const [likeTotal, setTotal] = React.useState(25) //{...props.totalLikes}

    useEffect(() => {        
        setLike(props.liked);
        setTotal(props.totalLikes)
    }, [props.liked, props.totalLikes])



    const handleExpandClick = () => {
        setExpanded(!expanded);
        // expandHandler();
    };

    const handleLike = () => {
        setLike(!like)
        const liked = !like
        const userId = props.userId
        sendLike(userId, props.socialId, liked)
        if ( !like ) {setTotal(likeTotal + 1)}
        else {setTotal(likeTotal - 1)}
    }

    async function sendLike(userId, id, liked) {

        const socialId = id

        const data = {
            userId,
            socialId,
            liked
        }

        await axios.post('/api/socials', data).then(
            (res) => {
                console.log(res.status)
            }
        ).catch(err => {
            console.log(err)
        })
    }


    return (

        <div>
        <section className="d-flex align-items-center even-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Card className={classes.root} >
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        R
                                    </Avatar>
                                }
                                action={
                                    <div className='row d-flex mt-3'>
                                        <div className='col-2 ml-auto'>
                                            <IconButton aria-label="add to favorites" onClick={() => handleLike()} color={like ? 'secondary' : "default"} className={classes.likeHeader}>
                                                <FavoriteIcon />
                                            </IconButton>
                                        </div>
                                        <div className='col-6 align-items-center d-flex'>
                                            <div className='ml-3'>{likeTotal}</div>
                                        </div>
                                    </div>
                                }
                                title={props.formTitle}
                                subheader={Intl.DateTimeFormat('fi').format(Date.parse(props.date))}
                                classes={{
                                    title: classes.headerTitle
                                }}
                            />

                            <CardMedia
                                className={classes.media}
                                image={props.picUrl}
                                title="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p" className={classes.formText}>
                                    {props.formText}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {props.content}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites" onClick={() => handleLike()} color={like ? 'secondary' : "default"}>
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share" >
                                    <ShareIcon />
                                </IconButton>
                            </CardActions>
                        </Card>

                    </div>

                </div>
            </div>
        </section>
        </div>


    );
}
