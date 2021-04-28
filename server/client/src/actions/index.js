import axios from 'axios';
import { FETCH_USER, FETCH_SETTINGS, FETCH_PROFILE } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  console.log('auth fetched')
  dispatch({ type: FETCH_USER, payload: res.data });
  
};

export const fetchSettings = () => async dispatch => {
  const res = await axios.get('/api/settings');
  console.log('settings fetched')
  dispatch({ type: FETCH_SETTINGS, payload: res.data });
  
};

export const fetchProfile = () => async dispatch => {
  const res = await axios.get('/api/profile');
  console.log('profile fetched')
  dispatch({ type: FETCH_PROFILE, payload: res.data });
  
};



// export const submitSurvey = values => async dispatch => {
//   const res = await axios.post('api/surveys', values);

// };