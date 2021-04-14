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

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
  

const Root = () => (
    <App />
)

  
  ReactDOM.render(
  <Provider store = {store}> <Root/> </Provider>,
  document.getElementById('root'));