import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../components/parts/Footer";
import { ReactComponent as Ideas } from "../assets/images/ideas.svg";
import cardvaluelist from "../assets/js/cardvalues";
import { createCard, createFeedCard } from "../components/cards/CardFunctions";
import ActivityCard from "../components/cards/ActivityCard";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Loader from "../components/parts/Loader";
import AOS from 'aos'

// getLevel function
import getLevel, { levelThresholds } from "../functions/getLevel";

// Circular-progress-bar
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Animation
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "../components/parts/AnimatedProgressProvider";

// Progress bar
import StepProgressBar from "../components/parts/ProgressBar";

import HomeNewsFeed from '../components/sections/HomeNewsFeed';
import HomeQuestion from '../components/sections/HomeQuestion';



// Roulette
import VoucherRouletteModal from '../components/parts/VoucherRouletteModal';
import LeaderBoard from "../components/sections/LeaderBoard";

// Google Analytics
import ReactGA from 'react-ga';
import GoogleAnalytics from '../GoogleAnalytics';
import keys from '../config/keys';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true, 
      surveysAns: undefined, 
      isProfile: null,    
      error: null,
      isLoaded: false,
      items: []
      };
    }
  

  componentDidMount() {
    console.debug("After mount! Let's load data from API...");
    axios.get("../api/surveys/count").then((response) => {
      this.setState({ surveyAns: response.data });
      this.setState({ isLoading: false });
    });
    axios
      .get("../api/profile")
      .then((response) => {
        this.setState({ isProfile: true });
      })
      .catch((err) => {
        this.setState({ isProfile: false });
      });

      fetch("https://vaikuttava-admin.ngrok.io/api/surveys")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result
					});
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)

    AOS.init({
      duration: 1500,
      once: true
    });
    
    ReactGA.initialize(keys.googleTrackingID);
    ReactGA.pageview(window.location.pathname + window.location.search);
    ReactGA.ga('send', 'pageview', window.location.pathname);

  
  }

  renderCards() {
    const { isLoading, surveyAns } = this.state;
    console.log(surveyAns);
    switch (isLoading) {
      default:
        return <Loader />;

      case false:
        const surveysToRender = (surveyAns) => {
          const renewableSurveysList = cardvaluelist.filter(
            (card) => card.tyyppi === "Vastaa" && card.resetHours !== undefined
          );
          const renewableSurveysIdList = renewableSurveysList.map((a) => a.id);
          var i;
          const surveyList = [];
          for (i = 0; i < surveyAns.list.length; i++) {
            const surveyId = surveyAns.list[i].id;
            var renewSurvey;
            const hoursSinceSubmit = Math.floor(
              (surveyAns.list[i].diff / (1000 * 60 * 60)) % 24
            );
            const SurveyResetTime = renewableSurveysList
              .filter((item) => item.id === surveyId)
              .map((a) => a.resetHours)[0];

            // check if enough time has passed since survey was ansered
            SurveyResetTime <= hoursSinceSubmit
              ? (renewSurvey = true)
              : (renewSurvey = false);

            // if a renewable survey id is in the list of submitted surveys, check if can be removed and delete from that list
            if (renewableSurveysIdList.includes(surveyId) && renewSurvey) {
              surveyList.push(surveyId);
            }
          }
          return surveyList;
        };

        var renewableSurveyList = surveysToRender(surveyAns);
        console.log(renewableSurveyList);

        const surveyCount = cardvaluelist
          .filter(
            (card) =>
              card.tyyppi === "Vastaa" &&
              (!surveyAns.id.includes(card.id) ||
                renewableSurveyList.includes(card.id))
          )
          .map(createCard);

        if (surveyCount === undefined || surveyCount.length === 0) {
          console.log(surveyCount);
          return (
            <div className="home-message vh-100">
              Olet ollut aktiivinen vaikuttaja! Uusia kysymyksiä tulossa pian...
            </div>
          );
        } else {
          console.log(surveyCount);
          return (
            <div className="row g-4 d-flex">
              {cardvaluelist
                .filter(
                  (card) =>
                    card.tyyppi === "Vastaa" &&
                    (!surveyAns.id.includes(card.id) ||
                      renewableSurveyList.includes(card.id))
                )
                .map(createCard)}
            </div>
          );
        }
    }
  }

  renderContent() {
    const profile = this.props.data.profile;
    switch (profile) {
      case null:
        return <Loader />;
      default:
        console.log(profile);
        return <h1>Tervetuloa {profile.fName}!</h1>;
    }
  }

  render() {
    const profile = this.props.data.profile;
    switch (profile) {
      case null:
        const { isProfile } = this.state;
        switch (isProfile) {
          case false:
            return <Loader />;
          default:
            return <Loader />;
        }
      default:
        console.log("profile fetched");
        const { surveyAns, items, isLoaded } = this.state;

        // determine level with getLevel function
        const levelData = getLevel(this.props.data.profile.points);
        const { currentPoints, level, maxLevelPoints } = levelData;

        const pointsPercentage = currentPoints / maxLevelPoints;
        var stepPositions = levelThresholds.map(
          (x) => x / (Math.max(...levelThresholds) / 100)
        );
        stepPositions.unshift(0);
        const points = this.props.data.profile.points;
        const progress = points / (Math.max(...levelThresholds) / 100);

        return (
          <div>
            <div id="page-top"></div>
            <section id="hero" className="d-flex align-items-center">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-2">
                    {this.renderContent()}
                    <div className="progress-circle">
                      <AnimatedProgressProvider
                        valueStart={0}
                        valueEnd={pointsPercentage * 100}
                        duration={3}
                        easingFunction={easeQuadInOut}
                      >
                        {(value) => {
                          const roundedValue = Math.round(
                            (value / 100) * maxLevelPoints
                          );
                          return (
                            <CircularProgressbarWithChildren
                              value={value}
                              text={`${roundedValue} / ${maxLevelPoints} p`}
                              styles={buildStyles({
                                pathTransition: "none",
                                textSize: "10px",
                                pathColor: `rgba(0, 128, 0, ${value / 20})`,
                                textColor: "rgb(0, 128, 0)",
                                trailColor: "#d6d6d6",
                                fontFamily: "TT Norms",
                              })}
                            >
                              <i
                                className="bx bx-bolt-circle"
                                style={{
                                  width: "20%",
                                  marginTop: 20,
                                  height: "30%",
                                  fontSize: "350%",
                                  color: "rgb(0, 128, 0)",
                                  textAlign: "center",
                                }}
                              />
                              <p className="level-name">{`Taso ${level}`}</p>
                            </CircularProgressbarWithChildren>
                          );
                        }}
                      </AnimatedProgressProvider>
                      <AnimatedProgressProvider
                        valueStart={0}
                        valueEnd={progress}
                        duration={3}
                        easingFunction={easeQuadInOut}
                      >
                        {(value) => {
                          const roundedValue = Math.round(
                            (value / 100) * maxLevelPoints
                          );
                          return (
                            <StepProgressBar
                              progress={value}
                              currentLevel={level}
                              stepPositions={stepPositions}
                            ></StepProgressBar>
                          );
                        }}
                      </AnimatedProgressProvider>
                    </div>
                    <div className="counts">
                      <div className="row m-4">
                        <ActivityCard
                          key={"a4"}
                          boxIcon={"bx bxs-coupon"}
                          count={this.props.data.profile.coupons}
                          cardText={"Kupongit yhteensä"}
                          suffix={""}
                          color={"blue"}
                          shine={"glowing"}
                        >
                          <VoucherRouletteModal
                          />
                          </ActivityCard>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-1 hero-img align-items-center">
                    <div className="img-fluid animated d-none d-lg-block">
                      <Ideas />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <div className = 'justify-content-center'>
            
            
            {isLoaded? 
              <HomeQuestion
              kyselyt={items} 
              />
            :
            <Loader />
            }
            </div>

            <div>
            <HomeNewsFeed />
            </div>

            <div className = 'odd-section leaderboard mt-1'>
              <div className = 'pt-3 mx-3'>
                <h3>Leaderboard</h3>
            <LeaderBoard />
            </div>
            </div>

            <Footer />
          </div>
        );
    }
  }
}

function mapStateToProps(data) {
  return { data };
}

export default connect(mapStateToProps)(HomePage);
