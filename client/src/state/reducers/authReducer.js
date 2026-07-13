import { SET_USER, SET_AUTH_LOADING, LOGOUT } from '../action-creators/actionTypes.js';

const initialState = {
  user: null,
  loading: true,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_AUTH_LOADING:
      return { ...state, loading: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default authReducer;
