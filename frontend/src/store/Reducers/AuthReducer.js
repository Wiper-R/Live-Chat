import Http from "../../http";

const LOGIN_START = "LOGIN_START";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";
const LOGOUT = "LOGOUT";

const LoginStart = () => {
  return {
    type: LOGIN_START,
  };
};

const LoginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload: payload,
  };
};

const LoginFailed = (err) => {
  return {
    type: LOGIN_FAILED,
    paylaod: { error: err },
  };
};

const Logout = () => {
  return {
    type: LOGOUT,
  };
};

const LoadUser = () => (dispatch, getState) => {
  dispatch(LoginStart());
  new Http("auth/protected", "POST").request().then(({ error }) => {
    if (error) {
      dispatch(LoginFailed("401 Unauthorized"));
    } else {
      new Http("user/@me", "GET").request().then(({ data, error }) => {
        if (error) {
          dispatch(LoginFailed("401 Unauthorized"));
        } else {
          dispatch(LoginSuccess(data));
        }
      });
    }
  });
};

const State = {
  user: null,
  isLoggedIn: false,
  isPopulated: false,
};

const AuthReducer = (state = State, action) => {
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

    default:
      return state;
  }
};

export default AuthReducer;
export { LoadUser, Logout };
