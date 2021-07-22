import { combineReducers } from 'redux';
import authReducer from './authReducer';
import settingsReducer from './settingsReducer'
import profileReducer from './profileReducer'
import storeReducer from './storeReducer'
import vouchersReducer from './vouchersReducer';
import couponReducer from './couponReducer';

export default combineReducers({
    auth: authReducer,
    settings: settingsReducer,
    profile: profileReducer,
    store: storeReducer,
    vouchers: vouchersReducer,
    coupons: couponReducer
});