import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions'
import AOS from 'aos';
import PrivateRoute from './helpers/PrivateRoute'
import RedirectRoute from './helpers/RedirectRoute'


//pages
import LandingPage from './pages/LandingPage'
import Signin from './components/forms/Signin';
import Signup from './components/forms/Signup';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import KyselyPage from './pages/KyselyPage';
import CreateProfile from './pages/CreateProfile';

//parts
import Header from './components/parts/Header'

class App extends Component {
  
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchSettings();
    this.props.fetchProfile();

      AOS.init({
        duration : 1500,
        once: true
      });
    

  };

  

  render() {
    const authStatus = this.props.auth.auth
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={LandingPage} />
            <PrivateRoute auth = {authStatus} path = "/home" component={HomePage} />
            <PrivateRoute auth = {authStatus} settings = {this.props.settings} exact path = "/profile" component={ProfilePage} />
            <PrivateRoute auth = {authStatus} path = "/survey:id" component={KyselyPage} />
            <RedirectRoute auth = {authStatus} component={Signin} path="/signin" />
            <Route auth = {authStatus} component={Signup} path="/signup" />
            <PrivateRoute auth = {authStatus} component={CreateProfile} path="/profile/create" />

          </div>
        </BrowserRouter>
      </div>
    );
  }
};

function mapStateToProps(auth, settings, profile) {
  return { auth, settings, profile };

}



export default connect(mapStateToProps, actions)(App);

