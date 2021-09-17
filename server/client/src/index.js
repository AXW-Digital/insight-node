/* eslint-disable */

// React
import React from 'react';
import ReactDOM from 'react-dom';

// CSS
import './assets/css/index.css';
import 'aos/dist/aos.css'
import 'react-phone-number-input/style.css'
import "antd/dist/antd.css";
import 'react-multi-carousel/lib/styles.css';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';


// React Components
import App from './App';


// Font-awesome
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Reducer
import reducers from './reducers';

// Google analytics
import ReactGA from 'react-ga';
import keys from './config/keys';


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const TRACKING_ID = keys.googleTrackingID;
ReactGA.initialize(TRACKING_ID);  

const Root = () => (
    <App />
)

  
  ReactDOM.render(
  <Provider store = {store}> <Root/> </Provider>,
  document.getElementById('root'));