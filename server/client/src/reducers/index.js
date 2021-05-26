import { combineReducers } from 'redux';
import authReducer from './authReducer';
import settingsReducer from './settingsReducer'
import profileReducer from './profileReducer'
import storeReducer from './storeReducer'

export default combineReducers({
    auth: authReducer,
    settings: settingsReducer,
    profile: profileReducer,
    store: storeReducer
});