import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";


class StepProgressBarOver extends React.Component {
  render()  
  {

    return (
      <ProgressBar
        percent={this.props.progress}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        stepPositions={this.props.stepPositions}
        height={12}
        hasStepZero={true}
      >
        <Step 
        transition="scale"
        >
          {({ accomplished, index }) => (
            <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {11}
          </div>
          )}
        </Step>
        <Step 
        transition="scale"
        >
          {({ accomplished, index }) => (
            <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {12}
          </div>
          )}
        </Step>
        <Step 
        transition="scale"
        >
          {({ accomplished, index }) => (
            <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {13}
          </div>
          )}
        </Step>
        <Step 
        transition="scale"
        >
          {({ accomplished, index }) => (
            <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {14}
          </div>
          )}
        </Step>
        <Step 
        transition="scale"
        >
          {({ accomplished, index }) => (
            <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {15}
          </div>
          )}
        </Step>
        <Step 
        transition="scale"
        >
          {({ accomplished, index }) => (
            <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {'++'}
          </div>
          )}
        </Step>
      </ProgressBar>
    );
  }
}

export default StepProgressBarOver;