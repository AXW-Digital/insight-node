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
import AOS from 'aos';
import HomeStepper from '../components/parts/HomeStepper';
import RouletteModal from "../components/cards/RouletteModal";
import { first } from 'rxjs/operators';
import cryptoRandomString from 'crypto-random-string';

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
import StepProgressBarOver from "../components/parts/ProgressBarOver";

import HomeNewsFeed from '../components/sections/HomeNewsFeed';
import HomeQuestion from '../components/sections/HomeQuestion';



// Roulette
import LeaderBoard from "../components/sections/LeaderBoard";
import { couponService } from '../functions/couponReduce'

// Google Analytics
import ReactGA from 'react-ga';
import GoogleAnalytics from '../GoogleAnalytics';
import keys from '../config/keys';
import { prizeService } from "../functions/prizeNumberGen";
import { useHistory } from "react-router-dom";





class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      surveysAns: undefined,
      isProfile: null,
      error: null,
      isLoaded: false,
      items: [],
      coupons: [],
      vouchers: [],
      couponsSent: false
    };

  }








  componentDidMount() {
    console.debug("After mount! Let's load data from API...");
    
    const getData = async () => {
      await axios.get("../api/surveys/count").then((response) => {
        this.setState({ surveysAns: response.data });
        this.setState({ isLoading: false });
      });
      await axios.get("../api/vouchers/reg/all").then((response) => {
        console.log('vouchers:', response.data)
        this.setState({ vouchers: response.data });
      });
      await axios
        .get("../api/profile")
        .then((response) => {
          this.setState({ isProfile: true });
        })
        .catch((err) => {
          this.setState({ isProfile: false });
        });
  
      await fetch(keys.adminUrl + "/api/surveys")
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
    }

    getData();
    

    const subscription = couponService.onCoupon(first()).subscribe(async coupons => {
      if (coupons !== null && !this.state.couponsSent) {
        console.log('sending coupons to backend: ', coupons)
        await axios.post('/api/coupons', coupons).then(
          (res) => {
            this.setState({couponsSent: true});
            console.log(res.status)
          }
        )
      }
    });

    const prizesub = prizeService.onNumber(first()).subscribe(async prize => {
      if (prize !== null) {
        


        var qrCode = cryptoRandomString({ length: 5 })


        var voucher = this.state.vouchers.filter(x => x.voucherId === prize)       
        
        if (voucher[0] === undefined || voucher[0] === null || voucher[0].length < 1) {
          const sleeptime = 1500
          const sleep = m => new Promise(r => setTimeout(r, m))
          await axios.get("../api/vouchers/reg/all").then((response) => {
            this.setState({ vouchers: response.data });
            voucher = response.data.filter(x => x.voucherId === prize)
          });
          console.log("Sleeping for ", sleeptime, "ms")
          await sleep(sleeptime)

        }



        console.log(voucher[0])
        const {
          voucherId,
          partnerId,
          benefitValue,
          benefitType,
          name
        } = voucher[0]


        const userId = this.props.data.profile._user

        const data = {
          userId,
          voucherId,
          partnerId,
          benefitValue,
          benefitType,
          name,
          qrCode
        }
        
        await axios.post('/api/vouchers', data)
          .then((res1) => {
            console.log(res1.status)
          })

        await axios.post(keys.adminUrl + '/api/vouchers/reg', data)
          .then((res2) => {
            console.log(res2.status)
          })

      }
    })

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

        const surveyCount = cardvaluelist
          .filter(
            (card) =>
              card.tyyppi === "Vastaa" &&
              (!surveyAns.id.includes(card.id) ||
                renewableSurveyList.includes(card.id))
          )
          .map(createCard);

        if (surveyCount === undefined || surveyCount.length === 0) {
          return (
            <div className="home-message vh-100">
              Olet ollut aktiivinen vaikuttaja! Uusia kysymyksiä tulossa pian...
            </div>
          );
        } else {
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
        const { surveyAns, items, isLoaded } = this.state;

        // determine level with getLevel function
        const levelData = getLevel(this.props.data.profile.points);
        const { currentPoints, level, maxLevelPoints } = levelData;

        const pointsPercentage = currentPoints / maxLevelPoints;

        var progress = 0
        var points = 0
        const lev = levelThresholds.slice(10)

        if (levelData.level <= 10) {
          var stepPositions = levelThresholds.slice(0, 10).map((x) => x / (Math.max(...levelThresholds.slice(0,10)) / 100));
          stepPositions.unshift(0);
          points = this.props.data.profile.points;
          progress = points / (Math.max(...levelThresholds.slice(0, 10)) / 100);
        } else if (levelData.level > 10){
          var stepPositions = levelThresholds.slice(10).map((x) => x / (Math.max(...levelThresholds.slice(10)) / 100));
          stepPositions.unshift(0);
          points = this.props.data.profile.points;
          progress = points / (Math.max(...levelThresholds.slice(10)) / 100);
        }
        

        switch (points) {

          case 300:
            return (
              <div>
                <div id="page-top"></div>
                <section id="hero" className="d-flex align-items-center">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-6 pt-5 pt-lg-0 order-1 order-lg-2">
                        <div className="img-fluid animated mb-5">
                          <h1>Tervetuloa {profile.fName}!</h1>
                        </div>
                      </div>
                      <div className="col-lg-6 order-2 order-lg-1 hero-img align-items-center">

                        <HomeStepper startStep={2} />

                      </div>
                    </div>
                  </div>
                </section>

                <div>
                  <HomeNewsFeed />
                </div>

                <div className='odd-section leaderboard mt-1'>
                  <div className='pt-3 mx-3'>
                    <h3>Leaderboard</h3>
                    <LeaderBoard />
                  </div>
                </div>

                <Footer />

              </div>
            );


          default:

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
                                    pathColor: `rgba(54, 58, 89, ${value / 20})`,
                                    textColor: "rgb(54, 58, 89)",
                                    trailColor: "#d6d6d6",
                                    fontFamily: "TT Norms",
                                    strokeLinecap: 'butt',
                                  })}
                                >
                                  <i
                                    className="bx bx-bolt-circle"
                                    style={{
                                      width: "20%",
                                      marginTop: 20,
                                      height: "30%",
                                      fontSize: "350%",
                                      color: "rgb(54, 58, 89)",
                                      textAlign: "center",
                                    }}
                                  />
                                  <p className="level-name">{`Taso ${level}`}</p>
                                </CircularProgressbarWithChildren>
                              );
                            }}
                          </AnimatedProgressProvider>
                          {level <= 10 ? 
                          <>
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
                          </>
                          
                          :<>
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
                                <StepProgressBarOver
                                  progress={value}
                                  currentLevel={level}
                                  stepPositions={stepPositions}
                                ></StepProgressBarOver>
                              ); 
                            }}
                          </AnimatedProgressProvider>
                          </> }


                        </div>
                        <div className="counts">
                          <div className="row m-4">
                            <RouletteModal
                              count={this.props.data.profile.coupons}
                              vouchers={this.state.vouchers}
                            />
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

                <div className='justify-content-center'>


                  {isLoaded ?
                    <HomeQuestion
                      kyselyt={items}
                      currentPoints={points}
                      surveyAns = {this.state.surveysAns}
                    />
                    :
                    <Loader />
                  }
                </div>

                <div>
                  <HomeNewsFeed />
                </div>

                <div className='odd-section leaderboard mt-1'>
                  <div className='pt-3 mx-3'>
                    <h3>Leaderboard</h3>
                    <LeaderBoard />
                  </div>
                </div>

                <Footer />
              </div>
            );
        }

      case false:
        return (
          <div>
            <div id="page-top"></div>
            <section id="hero" className="d-flex align-items-center">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 pt-5 pt-lg-0 order-1 order-lg-2">
                    <div className="img-fluid animated mb-5">
                      <h1>Hei vaikuttaja, muistathan päivittää profiilisi!</h1>
                    </div>
                  </div>
                  <div className="col-lg-6 order-2 order-lg-1 hero-img align-items-center">

                    <HomeStepper startStep={1} />

                  </div>
                </div>
              </div>
            </section>

            <div>
              <HomeNewsFeed />
            </div>

            <div className='odd-section leaderboard mt-1'>
              <div className='pt-3 mx-3'>
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
