import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import profilesReducer from "./profile.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profilesReducer,
});

export default rootReducer;
