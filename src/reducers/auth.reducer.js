import {
  SET_LOGIN_SUCCESS,
  SET_LOGIN_FAIL,
  SET_USER_LOADED,
  SET_TOKEN,
  SET_REFRESH_TOKEN,
  SET_LOGOUT_AT,
  SET_IS_AUTHENTICATED,
} from "../constants/types";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  refreshToken: null,
  error: null,
  loading: false,
  logoutAt: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        token: action.token,
        error: null,
        loading: false,
        logoutAt: action.logoutAt,
      };
    case SET_LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.error,
        loading: false,
        logoutAt: null,
      };
    case SET_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        token: action.token,
        error: null,
        loading: false,
        logoutAt: action.logoutAt,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.refreshToken,
      };
    case SET_LOGOUT_AT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        refreshToken: null,
      };
    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    default:
      return state;
  }
};

export default authReducer;
