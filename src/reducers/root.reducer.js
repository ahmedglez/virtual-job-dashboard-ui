import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import profilesReducer from "./profile.reducer";
import adminReducer  from "./admin.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profilesReducer,
  administrator: adminReducer
});

export default rootReducer;
