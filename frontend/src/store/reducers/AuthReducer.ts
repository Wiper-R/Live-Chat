import { AppDispatch } from "../../store";
import request, { ApiError } from "../../request";
import { User } from "../types";
const LOGIN_START = "LOGIN_START";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";
const LOGOUT = "LOGOUT";
const USER_LOADED = "USER_LOADED";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isPopulated: boolean;
}

const State: AuthState = {
  user: null,
  isLoggedIn: false,
  isPopulated: false,
};

interface Payload {
  [key: string]: any;
}

interface Action {
  type: string;
  payload?: Payload;
}

const LoginStart = (): Action => {
  return {
    type: LOGIN_START,
  };
};

const LoginSuccess = (payload: Payload):Action => {
  return {
    type: LOGIN_SUCCESS,
    payload: payload,
  };
};

const LoginFailed = (err: string | null):Action => {
  return {
    type: LOGIN_FAILED,
    payload: { error: err },
  };
};

const UserLoaded = (payload: object):Action => {
  return {
    type: USER_LOADED,
    payload,
  }
}

const Logout = ():Action => {
  return {
    type: LOGOUT,
  };
};

const LoadUser = () => (dispatch: AppDispatch, _: any) => {
  dispatch(LoginStart());
  request("auth/protected", { method: "POST" }).then(
    (_) => {
      request("users/@me").then(
        (user) => dispatch(LoginSuccess((user))),
        (e: ApiError) => dispatch(LoginFailed(e.message))
      );
    },
    (e: ApiError) => dispatch(LoginFailed(e.message))
  );
};

const AuthReducer = (state = State, action: Action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, user: null, isLoggedIn: false, isPopulated: false };

    case LOGIN_FAILED:
      return { ...state, isPopulated: true };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        isPopulated: true,
      };

    case LOGOUT:
      return { ...state, user: null, isLoggedIn: false, isPopulated: true };

    case USER_LOADED:
      return {...state, user: action.payload}

    default:
      return state;
  }
};

export default AuthReducer;
export type {AuthState};
export { LoadUser, Logout, UserLoaded };
