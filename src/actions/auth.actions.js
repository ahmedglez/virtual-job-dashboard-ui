import {
  SET_LOGIN_SUCCESS,
  SET_LOGIN_FAIL,
  SET_USER_LOADED,
  SET_AUTH_ERROR,
  SET_TOKEN,
  SET_TOKEN_LOCAL_STORAGE,
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

const getToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});

const getTokenFromLocalStorage = (payload) => ({
  type: SET_TOKEN_LOCAL_STORAGE,
  payload,
});

export {
  registrerSuccess,
  registrerFail,
  userLoaded,
  authError,
  getToken,
  getTokenFromLocalStorage,
};
