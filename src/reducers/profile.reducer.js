import {
  SET_PROFILE,
  SET_PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  SET_ACTIVE,
  SET_ASSIGNED_TASK,
  SET_COMPLETED_TASK,
  SET_PENDING_TASK,
} from "../constants/types";

const initialState = {
  user: null,
  active: false,
  assignedTasks: [],
  completedTasks: [],
  pendingTasks: [],
  error: null,
};



export const profilesReducer = (state = initialState, action) => {
  const data = action.payload;

  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        user: data,
        active: true,
        assignedTasks: data.assignedTasks,
        pendingTasks: data.pendingTasks,
        completedTasks: data.completedTasks,
      };
    case SET_PROFILE_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case CLEAR_PROFILE:
      state = initialState;
      return {
        ...state,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    case SET_ACTIVE:
      return {
        ...state,
        active: action.payload,
      };
    case SET_ASSIGNED_TASK:
      return {
        ...state,
        assignedTasks: action.payload,
      };
    case SET_COMPLETED_TASK:
      return {
        ...state,
        completedTasks: action.payload,
      };
    case SET_PENDING_TASK:
      return {
        ...state,
        pendingTasks: action.payload,
      };

    default:
      return state;
  }
};

export default profilesReducer;
