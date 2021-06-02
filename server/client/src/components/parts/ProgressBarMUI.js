import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    minWidth: '128px'
  },
});

export default function ProgressBarMUI(props) {
  const classes = useStyles();

   return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={props.progress} />
    </div>
  );
}