import Http from "../../../http";

const MESSAGES_LOADING = "MESSAGES_LOADING";
const MESSAGES_LOADED = "MESSAGES_LOADED";
const MESSAGES_LOADING_FAILED = "MESSAGES_LOADING_FAILED";
const MESSAGE_CREATED = "MESSAGE_CREATED";

const MessagesLoading = () => {
  return {
    type: MESSAGES_LOADING,
  };
};

const MessagesLoaded = (messages) => {
  return {
    type: MESSAGES_LOADED,
    payload: {
      messages,
    },
  };
};

const MessagesLoadingFailed = () => {
  return {
    type: MESSAGES_LOADING_FAILED,
  };
};

const LoadMessages = (channelId) => (dispatch, getState) => {
  dispatch(MessagesLoading());
  new Http(`channels/${channelId}/messages`, "GET")
    .request()
    .then(({ data, error }) => {
      if (error) {
        return dispatch(MessagesLoadingFailed());
      }
      dispatch(MessagesLoaded(data));
    });
};

const MessageCreated = (message) => {
  return {
    type: MESSAGE_CREATED,
    payload: { message },
  };
};

const State = {
  isFetching: false,
  data: [],
};

const MessagesReducer = (state = State, action) => {
  switch (action.type) {
    case MESSAGES_LOADING:
      return {
        ...state,
        isFetching: true,
        data: [],
      };
    case MESSAGES_LOADED:
      return {
        ...state,
        isFetching: false,
        data: action.payload.messages,
      };
    case MESSAGES_LOADING_FAILED:
      return {
        ...state,
        isFetching: true,
        data: [],
      };
    case MESSAGE_CREATED:
      return {
        ...state,
        data: [...state.data, action.payload.message],
      };
    default:
      return state;
  }
};

export default MessagesReducer;
export { LoadMessages, MessageCreated };
