import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import VariablesReducer from "./VariablesReducer";

export default combineReducers({
  auth: AuthReducer,
  variables: VariablesReducer,
});
