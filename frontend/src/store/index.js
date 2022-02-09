import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import Reducers from "./Reducers";

const middlewares = [thunk];

const store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
