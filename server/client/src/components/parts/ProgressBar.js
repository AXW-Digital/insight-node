/* eslint-disable */
 
import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";


class StepProgressBar extends React.Component {
  render()  
  {

    return (
      <ProgressBar
        percent={this.props.progress}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        stepPositions={this.props.stepPositions}
        height={8}
        hasStepZero={false}
      >
        <Step 
        transition="scale"
        >
          {({ accomplished, index }) => (
            <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {index + 1}
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
            {index + 1}
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
            {index + 1}
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
            {index + 1}
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
            {index + 1}
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
            {index + 1}
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
            {index + 1}
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
            {index + 1}
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
            {index + 1}
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
            {index + 1}
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
            {'10+'}
          </div>
          )}
        </Step>
      </ProgressBar>
    );
  }
}

export default StepProgressBar;