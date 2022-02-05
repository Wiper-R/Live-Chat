// Actions
const CHAT_SELECT_USER_LOADING = "CHAT_SELECT_USER_LOADING";
const CHAT_SELECT_USER_LOADED = "CHAT_SELECT_USER_LOADED";
const CHAT_SELECT_USER_LOADING_FAILED = "CHAT_SELECT_USER_LOADING_FAILED";
const CHAT_DESELECT = "CHAT_DESELECT";

const ChatSelectUserLoading = (payload) => {
    return {
        type: CHAT_SELECT_USER_LOADING,
        payload,
    }
}

const ChatDeselect = () => {
    return {
        type: CHAT_DESELECT
    }
}

const ChatSelectUserLoaded = (payload) => {
    return {
        type: CHAT_SELECT_USER_LOADED,
        payload
    }
}

const ChatSelectUserLoadingFailed = () => {
    return {
        type: CHAT_SELECT_USER_LOADING_FAILED,
    }
}


const SelectChat = (id) => (dispatch, getState) => {
    const state = getState().variables.selectedChat;
    if (state.id == id){
        return;
    }

    dispatch(ChatSelectUserLoading(id));

    try{
        fetch(`http://127.0.0.1:5000/api/user/${id}`, {
            method: 'GET',
            credentials: 'include'
        }).then(
            res => {
                if (res.ok) {
                    res.json().then(user => dispatch(ChatSelectUserLoaded(user)))
                }
                else {
                    dispatch(ChatSelectUserLoadingFailed());
                }
            }
        )
    }
    catch{
        dispatch(ChatSelectUserLoadingFailed());
    }
}

//


// Reducer Itself
const State = {
    id: null, 
    user: null,
    isFetching: false,
}

const SelectedChatReducer = (state = State, action) => {
    switch (action.type) {
        case CHAT_SELECT_USER_LOADING:
            console.log(action);
            return {
                ...state,
                id: action.payload,
                user: null,
                isFetching: true, 
            }

        case CHAT_DESELECT:
            return {
                ...state,
                id: null,
                user: null,
                isFetching: false,
            }

        case CHAT_SELECT_USER_LOADED:
            return {
                ...state,
                user: action.payload,
                isFetching: false,
            }

        case CHAT_SELECT_USER_LOADING_FAILED:
            return {
                ...state,
                isFetching: false,
            }

        default:
            return state;
    }
}


export default SelectedChatReducer;
export {
    SelectChat
}