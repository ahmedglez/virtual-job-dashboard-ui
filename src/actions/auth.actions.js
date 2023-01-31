import {
  SET_LOGIN_SUCCESS,
  SET_LOGIN_FAIL,
  SET_USER_LOADED,
  SET_AUTH_ERROR,
  SET_TOKEN,
  SET_REFRESH_TOKEN
} from "../constants/types";

const registrerSuccess = (payload) => ({
  type: SET_LOGIN_SUCCESS,
  payload,
});

const registrerFail = (payload) => ({
  type: SET_LOGIN_FAIL,
  payload,
});

const userLoaded = (payload) => ({
  type: SET_USER_LOADED,
  payload,
});

const authError = (payload) => ({
  type: SET_AUTH_ERROR,
  payload,
});

const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});

const setRefreshToken = (payload) => ({
  type: SET_REFRESH_TOKEN,
  payload,
});

export { registrerSuccess, registrerFail, userLoaded, authError, setToken, setRefreshToken };
