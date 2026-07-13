import { SHOW_TOAST, HIDE_TOAST } from '../action-creators/actionTypes.js';

const initialState = {
  toast: null,
};

function toastReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_TOAST:
      return { ...state, toast: action.payload };
    case HIDE_TOAST:
      return { ...state, toast: null };
    default:
      return state;
  }
}

export default toastReducer;
