/* eslint-disable import/no-anonymous-default-export */

import { FETCH_VOUCHERS } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_VOUCHERS:
      return action.payload;
    default:
      return state;
  }
}
