/* eslint-disable */
import { FETCH_SOCIALS } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_SOCIALS:
      return action.payload || false;
    default:
      return state;
  }
}