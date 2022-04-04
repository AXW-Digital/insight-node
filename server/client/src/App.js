/* eslint-disable */

import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions'
import AOS from 'aos';
import PrivateRoute from './helpers/PrivateRoute'
import RedirectRoute from './helpers/RedirectRoute'
import CreateProfileRoute from './helpers/CreateProfileRoute'
import { Provider } from "react-redux";
import rootStore from './store/index';
import createHistory from 'history/createBrowserHistory';




//pages
import LandingPage from './pages/LandingPage'
import Signin from './components/forms/Signin';
import Signup from './components/forms/Signup';
import Test from './pages/Wallet';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import KyselyPage from './pages/KyselyPage';
import CreateProfile from './pages/CreateProfile';
import Kyselyt from './pages/Kyselyt';
import More from './pages/More';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import FeedPage from './pages/FeedPage';
import ArticlePage from './pages/ArticlePage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiesPage from './pages/CookiesPage';

//parts
import Header from './components/parts/Header';
import { IdleTimeOutModal } from './components/parts/TimeoutModal';
import IdleTimer from 'react-idle-timer';
// Navigation
import NavigationBottom from './components/parts/NavigationBottom'

// Google Analytics
import ReactGA from 'react-ga';
import keys from './config/keys';
import GoogleAnalytics from './GoogleAnalytics';

// Cookies consent
import CookieConsent from "react-cookie-consent";




const history = createHistory()
history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
})


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      timeout: 2 * 60 * 60 * 1000,
      logOut: 7 * 24 * 60 * 60 * 1000,
      showModal: false,
      userLoggedIn: false,
      isTimedOut: false
    }

    this.idleTimer = null
    this.onAction = this._onAction.bind(this)
    this.onActive = this._onActive.bind(this)
    this.onIdle = this._onIdle.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleIdle = this.handleIdle.bind(this)
  }

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchSettings();
    this.props.fetchProfile();
    this.props.fetchVouchers();
    this.props.fetchStore();
    this.props.fetchCoupons();
    this.props.fetchSocials();

    AOS.init({
      duration: 1500,
      once: true
    });

  };





    _onAction(e) {
      // console.log('user did something', e)
      this.setState({ isTimedOut: false })
    }

    _onActive(e) {
      // console.log('user is active, time to idle: ')
      this.setState({ isTimedOut: false })
      // console.log()
    }

    _onIdle(e) {
      console.log('user is idle')
      const isTimedOut = this.state.isTimedOut
      if (isTimedOut) {
        setTimeout(this.handleIdle(), this.state.logOut)
      } else {
        if (this.props.data.auth !== false) {
          this.setState({ showModal: true })
          setTimeout(() => this.handleIdle(), this.state.logOut)        
          this.setState({ isTimedOut: true })
        }
        
      }

    }
    handleClose() {
      this.setState({showModal: false})
      window.location.reload(false);
    }

    handleLogout() {
      this.setState({showModal: false})
      window.location.href ='/api/logout'
    }

    handleIdle(){
      this.setState({ showModal: false })
      this.handleLogout()
    }


  


  render() {
    const authStatus = this.props.data.auth
    var profileStatus = this.props.data.profile




    return (
      <BrowserRouter history={history}>
        <div>
          <Header />
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute auth={authStatus} profile={profileStatus} path="/home" component={HomePage} />
          <PrivateRoute auth={authStatus} profile={profileStatus} path="/kyselyt" component={Kyselyt} />
          <PrivateRoute auth={authStatus} profile={profileStatus} exact path="/profile" component={ProfilePage} />
          <PrivateRoute auth={authStatus} profile={profileStatus} path="/m/settings" component={Settings} />
          <PrivateRoute auth={authStatus} profile={profileStatus} path="/m/profile" component={Profile} />
          <PrivateRoute auth={authStatus} profile={profileStatus} path="/more" component={More} />
          <PrivateRoute auth={authStatus} profile={profileStatus} path="/test" component={Test} />
          <PrivateRoute auth={authStatus} profile={profileStatus} path="/feed" component={FeedPage} />
          <PrivateRoute auth={authStatus} path="/survey:id" component={KyselyPage} />
          <Route auth={authStatus} component={ArticlePage} path="/article/:id" />
          <Route auth={authStatus} component={TermsAndConditionsPage} path="/kayttoehdot" />
          <Route auth={authStatus} component={PrivacyPolicyPage} path="/tietosuojalauseke" />
          <Route auth={authStatus} component={CookiesPage} path="/evasteet" />
          <RedirectRoute auth={authStatus} component={Signin} path="/signin" />
          <Route auth={authStatus} component={Signup} path="/signup" />
          <Route component={CreateProfile} exact path="/profile/create" />

          {/* Time out modal component */}

          <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            onAction={this.onAction}
            debounce={250}
            timeout={this.state.timeout}
          />

          <IdleTimeOutModal 
          showModal={this.state.showModal}
          handleClose={this.handleClose}
          handleLogout={this.handleLogout} 
          remainingTime = {this.state.logOut}         
          />

          {/* End time out modal component */}

          {/* Cookie consent */}
          <CookieConsent
            location="bottom"
            buttonText="OK"
            style={{ background: "rgba(63, 61, 86, 0.8)" }}
            buttonStyle={{ color: "#4e503b", fontSize: "16px", fontFamily: 'Arial' }}
            expires={150}
            overlay={true}
          >
            KÄYTÄMME EVÄSTEITÄ.{" "}
            <span style={{ fontSize: "13px", fontFamily: 'TT Norms Light' }}>Käytämme evästeitä käyttökokemuksen parantamiseen ja sivuston käytön analysointiin. </span>
            <a className='ml-auto' href='/evasteet'>&nbsp; Lisätietoja evästeistä</a>
          </CookieConsent>
          {/* end cookies consent */}

          <NavigationBottom />
        </div>
        <GoogleAnalytics />
      </BrowserRouter>
    );
  }
};

function mapStateToProps(data) {
  return { data };

}



export default connect(mapStateToProps, actions)(App);

