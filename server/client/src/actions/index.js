import axios from 'axios';
// import { dispatch } from 'rxjs/internal/observable/pairs';
import {
  FETCH_USER,
  FETCH_SETTINGS,
  FETCH_PROFILE,
  FETCH_STORE,
  FETCH_VOUCHERS,
  FETCH_COUPONS,
  FETCH_SOCIALS
} from './types';
// import keys from '../config/keys'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });

};

export const fetchProfile = () => async dispatch => {
  const res = await axios.get('/api/profile');
  dispatch({ type: FETCH_PROFILE, payload: res.data });

};

export const fetchSettings = () => async dispatch => {
  const res = await axios.get('/api/settings');
  dispatch({ type: FETCH_SETTINGS, payload: res.data });
};


// export const fetchRouletteOpt = () => async dispatch => {
//   const res = await axios.get(keys.adminUrl + '/api/vouchers');
//   console.log('roulette options fetched')
//   dispatch({ type: FETCH_ROULETTE, payload: res.data });
// };

export const fetchVouchers = () => async dispatch => {
  const profile_res = await axios.get('/api/profile');
  const res = await axios.get('/api/vouchers/user/' + profile_res.data._user)
  dispatch({ type: FETCH_VOUCHERS, payload: res.data });
};

export const fetchSocials = () => async dispatch => {
  const profile_res = await axios.get('/api/profile');
  const res = await axios.get('/api/socials/' + profile_res.data._user)
  dispatch({ type: FETCH_SOCIALS, payload: res.data });
};


export const fetchStore = () => dispatch => {
  dispatch({
    type: FETCH_STORE, payload: {
      modalOpen: false
    }
  })
}


// export const submitSurvey = values => async dispatch => {
//   const res = await axios.post('api/surveys', values);

// };


export const fetchCoupons = () => async dispatch => {
  const res = await axios.get('/api/coupons/');
  dispatch({ type: FETCH_COUPONS, payload: res.data });
};