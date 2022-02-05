const CHAT_SELECT = "CHAT_SELECT";
const CHAT_DESELECT = "CHAT_DESELECTS";
const CHAT_SELECT_USER = "CHAT_SELECT_USER";

const chatSelect = (value) => {
    return {
        type: CHAT_SELECT,
        id: value,
    }
}

const chatDeSelect = () => {
    return {
        type: CHAT_DESELECT
    }
}

const chatSelectUser = (user) => {
    return {
        type: CHAT_SELECT_USER,
        payload: user,
    }
}


const selectChat = (id) => (dispatch, getState) => {
    const state = getState().variables.selectedChat;

    if (state.id == id){
        return
    }

    dispatch(chatSelect(id));
    fetch('http://127.0.0.1:5000/api/user', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(
            {
                user_id: id
            }
        )
    }).then(
        res => {
            if (res.ok) {
                res.json().then(user => dispatch(chatSelectUser(user)))
            }
            else {
                dispatch(chatDeSelect());
            }
        }
    )
}

const State = {
    id: null, 
    user: null,
    isFetching: false,
}

const SelectedChat = (state = State, action) => {
    switch (action.type) {
        case CHAT_SELECT:
            state = {
                ...state,
                id: action.id,
                user: null,
                isFetching: true, 
            }
            return state;

        case CHAT_DESELECT:
            state = {
                ...state,
                id: null,
                user: null,
                isFetching: false,
            }
            return state;

        case CHAT_SELECT_USER:
            state = {
                ...state,
                user: action.payload,
                isFetching: false,
            }

            return state;

        default:
            return state
    }
}


export default SelectedChat;
export {
    selectChat
}