// React
import React from 'react';
import ReactDOM from 'react-dom';

// CSS
import './assets/css/index.css';
import 'aos/dist/aos.css'
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';


// React Components
import App from './App';
import Signin from './components/forms/Signin';
import Signup from './components/forms/Signup';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import KyselyPage from './pages/KyselyPage'

// RouterDOM
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


// Font-awesome
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';




const Root = () => (
    <Router>
        <React.Fragment>
                <Switch>
                    <Route component={App} exact path="/" />
                    <Route component={Signin} path="/signin" />
                    <Route component={Signup} path="/signup" />
                    <Route component={HomePage} path = "/home" />
                    <Route component={ProfilePage} path='/profile' />
                    <Route component={KyselyPage} path = '/survey:id'/>
                </Switch>
        </React.Fragment>
    </Router>
  )
  
  

  
  ReactDOM.render(<Root/>,document.getElementById('root'));