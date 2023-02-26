import { SET_TASKS } from "constants/types";

const initialState = {
  tasks: [],
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
    default:
      return state;
  }
};

export default adminReducer;
