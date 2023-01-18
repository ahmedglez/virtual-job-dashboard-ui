import {
  SET_PROFILE,
  SET_PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  SET_ACTIVE,
} from "../constants/types";

const getProfile = (payload) => ({
  type: SET_PROFILE,
  payload,
});

const profileError = (payload) => ({
  type: SET_PROFILE_ERROR,
  payload,
});

const clearProfile = () => ({
  type: CLEAR_PROFILE,
});

const updateProfile = (payload) => ({
  type: UPDATE_PROFILE,
  payload,
});

const setActive = (payload) => ({
  type: SET_ACTIVE,
  payload,
});



export { getProfile, profileError, clearProfile, updateProfile };
