import { createStore } from "redux";
import combineReducers from '../reducers/index';
const rootStore = createStore(combineReducers);
export default rootStore;