import {
  SET_LOGIN_SUCCESS,
  SET_LOGIN_FAIL,
  SET_USER_LOADED,
  SET_TOKEN,
  SET_REFRESH_TOKEN,
  SET_LOGOUT_AT,
  SET_IS_AUTHENTICATED,
} from "../constants/types";
import LocalStorageUtils from "../utils/localStorageUtils";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  refreshToken: null,
  error: null,
  loading: false,
  logoutAt: null,
  username: null,
  password: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_SUCCESS:
      LocalStorageUtils.setToken(action.token);
      LocalStorageUtils.setRefreshToken(action.refreshToken);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        error: null,
        loading: false,
        logoutAt: action.payload.logoutAt,
        username: action.payload.username,
        password: action.payload.password,
      };
    case SET_LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        refreshToken: null,
        error: action.error,
        loading: false,
        logoutAt: null,
      };
    
    case SET_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        error: null,
        loading: false,
      };
    

    case SET_TOKEN:
      LocalStorageUtils.setToken(action.token);
      return {
        ...state,
        token: action.token,
      };
    case SET_REFRESH_TOKEN:
      LocalStorageUtils.setRefreshToken(action.refreshToken);
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
