import React, {useEffect} from "react";
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



export default function FeedCard(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: "min(75vw, 325px)",
      maxWidth: '500px !important',
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
  }));

  var color = randomMC.getColor();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [like, setLike] = React.useState({...props.liked});
  
  useEffect(()=>{
      setLike(props.liked);
  }, [props.liked])
  


  const handleExpandClick = () => {
    setExpanded(!expanded);
    props.expandHandler();
  };

  const handleLike = () => {
    setLike(!like)
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
      <Card className={classes.root} >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton  onClick={props.clickHandler}>
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
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={() => handleLike()} color={like ? 'secondary' : "default" }>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={props.shareHandler} >
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
    </div>    
  );
}
