import { combineReducers } from "redux";
import branchReducer from "./branch/branchReducer";
import userReducer from "./user/userReducer";
import { exp } from "react-native-reanimated";
export default combineReducers({
  branchReducer,
  userReducer,
});
