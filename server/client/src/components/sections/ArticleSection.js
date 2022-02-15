/* eslint-disable */
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
import LinkIcon from '@material-ui/icons/Link';
import Popover from '@material-ui/core/Popover';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import copy from 'copy-to-clipboard';
import { IoRestaurantOutline, IoNewspaperOutline } from 'react-icons/io5';
import { FaCocktail } from 'react-icons/fa';
import { GiChickenOven } from 'react-icons/gi';

// react-share
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,

  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon
} from 'react-share'

export default function ArticleSection(props) {

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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
      fontSize: '20px !important',
      fontFamily: 'TT Norms !important'
    },
    content: {
      fontSize: '16px !important'
    },
    likeHeader: {
      zIndex: '10 !important'
    },
    shareLink: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      textAlign: 'center',
      padding: '5px !important'
    },
    snackBar: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));


  var color = randomMC.getColor();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [like, setLike] = React.useState(false); //{ ...props.liked }
  const [likeTotal, setTotal] = React.useState(25) //{...props.totalLikes}
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [feedIcon, setFeedIcon] = React.useState(null);

  useEffect(() => {
    setLike(props.liked);
    setTotal(props.totalLikes)
    switch(props.feedType){
      case 'food':
        setFeedIcon( <GiChickenOven/> )
      case 'restaurant':
        setFeedIcon( <IoRestaurantOutline/> )
      case 'drink':
        setFeedIcon( <FaCocktail/> )
      default:
        setFeedIcon(< IoNewspaperOutline />)
    }
  }, [props.liked, props.totalLikes, props.feedType])

  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setAnchorEl(null);
  };



  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };




  function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard api method'
      setSnackOpen(true);
      return navigator.clipboard.writeText(textToCopy);

    } else {
      // text area method
      copy(textToCopy, {
        debug: true,
        message: 'Press #{key} to copy',
      });

      return new Promise((res, rej) => {

        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        // here the magic happens
        document.execCommand('copy') ? res() : rej();
       
        textArea.remove();
        setSnackOpen(true);
      });
    }
  }



  const copyCodeToClipboard = async (event) => {
    const url = `${window.location.origin.toString()}/article/${props.socialId}`
    await copyToClipboard(url)
      .then(() => console.log('copied'))
      .catch((err) => alert(err))
  }

  const handleLike = () => {
    setLike(!like)
    const liked = !like
    const userId = props.userId
    sendLike(userId, props.socialId, liked)
    if (!like) { setTotal(likeTotal + 1) }
    else { setTotal(likeTotal - 1) }
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
        // console.log(res.status)
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
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.content} >
                    <div dangerouslySetInnerHTML = {{__html: props.content}}></div>                    
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites" onClick={() => handleLike()} color={like ? 'secondary' : "default"}>
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share" onClick={handleShareClick} >
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>

            </div>

          </div>
        </div>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleShareClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <ul style={{ padding: 10, margin: 0 }}>
            <li
              className="network"
            >
              <FacebookShareButton
                className="network__share-button"
                url={`${window.location.origin.toString()}/article/${props.socialId}`}
                quote={props.formTitle}
              >
                <FacebookIcon
                  size={45}
                />
              </FacebookShareButton>
            </li>
            <li
              className="network"
            >
              <TwitterShareButton
                className="network__share-button"
                url={`${window.location.origin.toString()}/article/${props.socialId}`}
                title={props.formTitle}
              >
                <TwitterIcon
                  size={45}
                />
              </TwitterShareButton>
            </li>
            <li
              className="network"
            >
              <WhatsappShareButton
                className="network__share-button"
                url={`${window.location.origin.toString()}/article/${props.socialId}`}
                title={props.formTitle}
              >
                <WhatsappIcon
                  size={45}
                />
              </WhatsappShareButton>
            </li>
            <li
              className="network"
            >
              <LinkedinShareButton
                className="network__share-button"
                url={`${window.location.origin.toString()}/article/${props.socialId}`}
                title={props.formTitle}
              >
                <LinkedinIcon
                  size={45}
                />
              </LinkedinShareButton>
            </li>
            <li>

              <IconButton aria-label="share link" className={classes.shareLink} onClick={copyCodeToClipboard}>
                <LinkIcon
                  fontSize={'large'}
                  color={'action'}
                />
              </IconButton>

            </li>
          </ul>

        </Popover>

        <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity="success">
            Linkki kopioitu leikepöytään
          </Alert>
        </Snackbar>

      </section>
    </div>


  );
}
