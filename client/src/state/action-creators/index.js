import { SET_USER, SET_AUTH_LOADING, LOGOUT, SHOW_TOAST, HIDE_TOAST } from './actionTypes.js';
import Cookies from 'js-cookie';
import { getMe } from '../../services/authService.js';

// --- Auth Action Creators ---

export function setUser(user) {
  return { type: SET_USER, payload: user };
}

export function setAuthLoading(loading) {
  return { type: SET_AUTH_LOADING, payload: loading };
}

export function logoutUser() {
  return { type: LOGOUT };
}

// Async: check cookie and fetch user on app startup
export function checkAuth() {
  return async function (dispatch) {
    const token = Cookies.get('token');
    if (!token) {
      dispatch(setAuthLoading(false));
      return;
    }
    try {
      const userData = await getMe();
      dispatch(setUser(userData));
    } catch (error) {
      Cookies.remove('token');
    }
    dispatch(setAuthLoading(false));
  };
}

// Login: save cookie + set user in store
export function login(token, userData) {
  return function (dispatch) {
    Cookies.set('token', token, { expires: 7 });
    dispatch(setUser(userData));
  };
}

// Logout: remove cookie + clear user from store
export function logout() {
  return function (dispatch) {
    Cookies.remove('token');
    dispatch(logoutUser());
  };
}

// --- Toast Action Creators ---

export function showToast(message, type) {
  return { type: SHOW_TOAST, payload: { message, type } };
}

export function hideToast() {
  return { type: HIDE_TOAST };
}
