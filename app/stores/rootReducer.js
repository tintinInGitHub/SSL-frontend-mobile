import { combineReducers } from "redux";
import branchReducer from "./branch/branchReducer";
import { exp } from "react-native-reanimated";
export default combineReducers({
  branchReducer,
});
