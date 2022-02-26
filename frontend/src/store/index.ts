import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { AuthState } from "./reducers/AuthReducer";
import { GatewayStateInterface } from "./reducers/GatewayReducer";

const middlewares = [thunk];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

interface RootState {
  auth: AuthState;
  gateway: GatewayStateInterface;
}

export default store;
export type { RootState };
export type AppDispatch = typeof store.dispatch;
