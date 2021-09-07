import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from '@material-ui/core/CardActionArea';
import Collapse from "@material-ui/core/Collapse";
import Popover from '@material-ui/core/Popover';
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
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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

export default function FeedCard(props) {

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "min(75vw, 325px)",
      minWidth: "min(75vw, 325px)",
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
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: color,
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
        marginBottom: theme.spacing(5),
      },
      marginBottom: theme.spacing(8),
      zIndex: 999
    },
  }));

  var color = randomMC.getColor();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [like, setLike] = React.useState({ ...props.liked });
  const [snackOpen, setSnackOpen] = React.useState(false);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  useEffect(() => {
    setLike(props.liked);
  }, [props.liked])

  const handleExpandClick = () => {
    setExpanded(!expanded);
    props.expandHandler();
  };

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
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
            setSnackOpen(true);
        });
    }
}



const copyCodeToClipboard = async () => {
  const url = `${window.location.origin.toString()}/article/${props.socialId}`
  await copyToClipboard(url)
  .then(() => console.log('text copied'))
  .catch((err) => console.log(err))    
}

  const handleLike = () => {
    setLike(!like)
    // props.likeHandler();
    const liked = !like
    const userId = props.userId
    sendLike(userId, props.socialId, liked)
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
    <div className="my-2 ml-2 flip-wrapper col-xl-4 col-sm-6 kysely-col" key={props.key}>                { /* className="my-2 ml-2 flip-wrapper col-xl-4 col-sm-6 kysely-col" */}
      <Card className={classes.root}>
        <CardActionArea href={`/article/${props.socialId}`}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="close" onClick={props.clickHandler}>
                <CloseIcon />
              </IconButton>
            }
            title={props.formTitle}
            subheader={Intl.DateTimeFormat('fi').format(Date.parse(props.date))}
          />
          <CardMedia
            className={classes.media}
            image={props.picUrl}
            title="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.formText}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={() => handleLike()} color={like ? 'secondary' : "default"}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={handleShareClick}>
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.content}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>

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

      <Snackbar 
      open={snackOpen} 
      autoHideDuration={4000} 
      onClose={handleSnackClose}
      className={classes.snackBar}
      >
        <Alert onClose={handleSnackClose} severity="success">
          Linkki kopioitu leikepöytään
        </Alert>
      </Snackbar>


    </div>
  );
}
