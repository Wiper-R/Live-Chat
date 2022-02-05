// Actions
const RECENT_CHATS_LOADING = "RECENT_CHATS_LOADING";
const RECENT_CHATS_LOADED = "RECENT_CHATS_LOADED";
const RECENT_CHATS_LOADING_FAILED = "RECENT_CHATS_LOADING_FAILED";

const RecentChatLoading = () => {
  return {
    type: RECENT_CHATS_LOADING,
  };
};

const RecentChatLoaded = (payload) => {
  return {
    type: RECENT_CHATS_LOADED,
    payload,
  };
};

const RecentChatLoadingFailed = () => {
  return {
    type: RECENT_CHATS_LOADING_FAILED,
  };
};

const LoadRecentChats = () => (dispatch, _) => {
  dispatch(RecentChatLoading());
  try{
      fetch("http://127.0.0.1:5000/api/friends", { credentials: "include" }).then(
        (res) => {
          if (res.ok) {
            res.json().then((data) => {
              dispatch(RecentChatLoaded(data));
            });
          }
          else{
              dispatch(RecentChatLoadingFailed());
          }
        }
      );
  }
  catch {
      dispatch(RecentChatLoadingFailed());
  }
};


// Reducer Itself

const State = {
    data: [],
    isFetching: false,
}

const RecentChatReducers = (state = State, action) => {
    switch (action.type){
        case RECENT_CHATS_LOADING:
            return {
                ...state, isFetching: true,
            }

        case RECENT_CHATS_LOADED:
            return {
                ...state, isFetching: false, data: action.payload,
            }

        case RECENT_CHATS_LOADING_FAILED:
            return {
                ...state, isFetching: false, data: [],
            }

        default:
            return state;
    }
}

export default RecentChatReducers;
export {
    LoadRecentChats
};
