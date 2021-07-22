/* eslint-disable import/no-anonymous-default-export */
import { FETCH_COUPONS } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_COUPONS:
      return action.payload || false;
    default:
      return state;
  }
}