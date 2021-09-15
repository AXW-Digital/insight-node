import { FETCH_STORE } from '../actions/types';
const initialState = { modalOpen: false, prizeNum: null }

export default function storeReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === 'modal/opened') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      modalOpen: true
    }
  } else if (action.type === 'modal/closed' || action.type === FETCH_STORE) {
    return {
      ...state,
      modalOpen: false
    }
  } else if ((action.type === 'prizenum' || action.type === FETCH_STORE) && action.payload !== undefined) {
    return {
      ...state,
      prizeNum: action.payload
    }
  } else {
  // otherwise return the existing state unchanged
  return state
  }
}

