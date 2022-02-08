import Http from "../../../http";

// Actions
const RECENT_CHATS_LOADING = "RECENT_CHATS_LOADING";
const RECENT_CHATS_LOADED = "RECENT_CHATS_LOADED";
const RECENT_CHATS_LOADING_FAILED = "RECENT_CHATS_LOADING_FAILED";

const ChannelLoading = () => {
  return {
    type: RECENT_CHATS_LOADING,
  };
};

const ChannelLoaded = (payload) => {
  return {
    type: RECENT_CHATS_LOADED,
    payload,
  };
};

const ChannelLoadingFailed = () => {
  return {
    type: RECENT_CHATS_LOADING_FAILED,
  };
};

const LoadChannels = () => (dispatch, _) => {
  // dispatch(ChannelLoading());
  // try{
  //     fetch("http://127.0.0.1:5000/api/friends", { credentials: "include" }).then(
  //       (res) => {
  //         if (res.ok) {
  //           res.json().then((data) => {
  //             dispatch(ChannelLoaded(data));
  //           });
  //         }
  //         else{
  //             dispatch(ChannelLoadingFailed());
  //         }
  //       }
  //     );
  // }
  // catch {
  //     dispatch(ChannelLoadingFailed());
  // }
  // new Http("friends/", "GET").then()
};

// Reducer Itself

const State = {
  data: [],
  isFetching: false,
};

const ChannelReducers = (state = State, action) => {
  switch (action.type) {
    case RECENT_CHATS_LOADING:
      return {
        ...state,
        isFetching: true,
      };

    case RECENT_CHATS_LOADED:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };

    case RECENT_CHATS_LOADING_FAILED:
      return {
        ...state,
        isFetching: false,
        data: [],
      };

    default:
      return state;
  }
};

export default ChannelReducers;
export { LoadChannels };
