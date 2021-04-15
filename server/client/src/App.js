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
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={LandingPage} />
            <PrivateRoute auth = {this.props.auth.auth} path = "/home" component={HomePage} />
            <PrivateRoute auth = {this.props.auth.auth} settings = {this.props.settings} exact path = "/profile" component={ProfilePage} />
            <PrivateRoute auth = {this.props.auth.auth} path = "/survey:id" component={KyselyPage} />
            <RedirectRoute auth = {this.props.auth.auth} component={Signin} path="/signin" />
            <Route auth = {this.props.auth.auth} component={Signup} path="/signup" />
            <PrivateRoute auth = {this.props.auth.auth} component={CreateProfile} path="/profile/create" />

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

