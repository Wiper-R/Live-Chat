import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import GatewayReducer from "./GatewayReducer";

export default combineReducers({
  auth: AuthReducer,
  gateway: GatewayReducer,
});