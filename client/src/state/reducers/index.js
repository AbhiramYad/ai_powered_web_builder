import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import toastReducer from './toastReducer.js';

const reducers = combineReducers({
  auth: authReducer,
  toast: toastReducer,
});

export default reducers;
