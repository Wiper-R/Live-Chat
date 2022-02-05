const LOGIN_START = "LOGIN_START";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED"
const LOGOUT = "LOGOUT";


const LoginStart = () => {
    return {
        'type': LOGIN_START,
    }
}

const LoginSuccess = (payload) => {
    return {
        'type': LOGIN_SUCCESS,
        'payload': payload
    }
}

const LoginFailed = (err) => {
    return {
        'type': LOGIN_FAILED,
        'paylaod': { error: err },
    }
}

const Logout = () => {
    return {
        'type': LOGOUT
    }
}


const LoadUser = () => (dispatch, getState) => {
    dispatch(LoginStart());
    fetch('http://127.0.0.1:5000/api/auth/protected', {
        method: 'POST',
        credentials: 'include'
    }).then(
        res => {
            if (res.ok) {
                fetch('http://127.0.0.1:5000/api/auth/user', {
                    method: 'GET',
                    credentials: 'include',
                }).then(
                    res => {
                        if (res.ok) {
                            res.json().then(
                                user => {
                                    dispatch(LoginSuccess({ user }));
                                }
                            );
                        }
                        else {
                            dispatch(LoginFailed("401 Unauthorized"));
                        }
                    }
                )

            }
            else {
                dispatch(LoginFailed("404 Unauthorized"));
            }
        }
    )
}

const State = {
    user: null,
    isLoggedIn: false,
    isPopulated: false,
}


const AuthReducer = (state = State, action) => {
    switch(action.type){
        case LOGIN_START:
            return {...state, user: null, isLoggedIn: false, isPopulated: false};

        case LOGIN_FAILED:
            return {...state, isPopulated: true};

        case LOGIN_SUCCESS:
            return {...state, isLoggedIn: true, user: action.payload.user, isPopulated: true};

        case LOGOUT:
            return {...state, user: null, isLoggedIn: false, isPopulated: true};

        default:
            return state;     
    }
}

export default AuthReducer;
export {
    LoadUser
};