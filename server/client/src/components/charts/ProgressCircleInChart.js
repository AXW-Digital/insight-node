import React from 'react';
import AnimatedProgressProvider from '../parts/AnimatedProgressProvider';
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { easeQuadInOut } from 'd3-ease';

export default function ProgressCircleInChart(props) {

  const level = props.level
  const progress = props.progress



  return (
    <div className="progress-circle-chart d-flex justify-content-center">
      <AnimatedProgressProvider
        valueStart={0}
        valueEnd={progress * 100}
        duration={1.4}
        easingFunction={easeQuadInOut}
      >
        {value => {
          return (
            <div style={{ width: 55, height: 55 }}>
            <CircularProgressbar
              value={value}
              text={level}
              strokeWidth = {15}
              circleRatio = {0.7}
              /* This is important to include, because if you're fully managing the
        animation yourself, you'll want to disable the CSS animation. */
              styles={buildStyles({
                pathTransition: "none",
                pathColor: `rgba(54, 58, 89, 0.8)`,
                textColor: "rgb(54, 58, 89)",
                trailColor: "#d6d6d6",
                fontFamily: "TT Norms",
                textSize: '26pt',
                rotation: 0.65
              })}
            />
            </div>
          );
        }}
      </AnimatedProgressProvider>
    </div>
  )
}


