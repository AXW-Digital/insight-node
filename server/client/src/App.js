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
import Profile from './pages/Profile'

//parts
import Header from './components/parts/Header'

// Navigation
import NavigationBottom from './components/parts/NavigationBottom'



class App extends Component {
  
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchSettings();
    this.props.fetchProfile();
    this.props.fetchStore();

      AOS.init({
        duration : 1500,
        once: true
      });
    
  };

  

  render() {
    const authStatus = this.props.data.auth
    const profileStatus = this.props.data.profile



    return (      
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={LandingPage} />
            <PrivateRoute auth = {authStatus} profile = {profileStatus} path = "/home" component={HomePage} />
            <PrivateRoute auth = {authStatus} profile = {profileStatus} path = "/kyselyt" component={Kyselyt} />
            <PrivateRoute auth = {authStatus} profile = {profileStatus} path = "/profile" component={ProfilePage} />
            <PrivateRoute auth = {authStatus} profile = {profileStatus} path = "/m/settings" component={Settings} />
            <PrivateRoute auth = {authStatus} profile = {profileStatus} path = "/m/profile" component={Profile} />
            <PrivateRoute auth = {authStatus} profile = {profileStatus} path = "/more" component={More} />
            <PrivateRoute auth = {authStatus} profile = {profileStatus} path = "/test" component={Test} />
            <PrivateRoute auth = {authStatus} path = "/survey:id" component={KyselyPage} />
            <RedirectRoute auth = {authStatus} component={Signin} path="/signin" />
            <Route auth = {authStatus} component={Signup} path="/signup" />
            <CreateProfileRoute auth = {authStatus} profile = {profileStatus} component={CreateProfile} path="/profile/create" />
            <NavigationBottom/>
          </div>
        </BrowserRouter>      
    );
  }
};

function mapStateToProps(data) {
  return { data };

}



export default connect(mapStateToProps, actions)(App);

