import { SET_TASKS, SET_USERS } from "constants/types";

const initialState = {
  tasks: [],
  users: [],
  loading: false,
  error: null,
};

const adminReducer = (state = initialState, action) => {
  const data = action.payload;

  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: data,
      };
    case SET_USERS:
      return {
        ...state,
        users: data,
      };
    default:
      return state;
  }
};

export default adminReducer;
