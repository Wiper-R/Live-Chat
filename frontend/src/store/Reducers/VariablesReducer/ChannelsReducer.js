import Http from "../../../http";

// Actions
const CHANNELS_LOADING = "CHANNELS_LOADING";
const CHANNELS_LOADED = "CHANNELS_LOADED";
const CHANNELS_LOADING_FAILED = "CHANNELS_LOADING_FAILED";
const CHANNEL_CREATED = "CHANNEL_CREATED";
const CHANNEL_DELETED = "CHANNEL_DELETED";

const ChannelCreated = (channel) => {
  return {
    type: CHANNEL_CREATED,
    payload: channel,
  };
};

const ChannelDeleted = (channel) => {
  return {
    type: CHANNEL_DELETED,
    payload: channel,
  };
};

const ChannelLoading = () => {
  return {
    type: CHANNELS_LOADING,
  };
};

const ChannelLoaded = (payload) => {
  return {
    type: CHANNELS_LOADED,
    payload,
  };
};

const ChannelLoadingFailed = () => {
  return {
    type: CHANNELS_LOADING_FAILED,
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
  dispatch(ChannelLoaded([]));
};

// Reducer Itself

const State = {
  data: [],
  isFetching: false,
};

const ChannelReducers = (state = State, action) => {
  switch (action.type) {
    case CHANNELS_LOADING:
      return {
        ...state,
        isFetching: true,
      };

    case CHANNELS_LOADED:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };

    case CHANNELS_LOADING_FAILED:
      return {
        ...state,
        isFetching: false,
      };

    case CHANNEL_CREATED:
      if (state.data.filter((e) => e.id === action.payload.id).length > 0){
        return state;
      }
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case CHANNEL_DELETED:
      return {
        ...state,
        data: state.data.filter((ch) => ch.id != action.payload.id),
      };

    default:
      return state;
  }
};

export default ChannelReducers;
export { LoadChannels, ChannelDeleted, ChannelCreated };
