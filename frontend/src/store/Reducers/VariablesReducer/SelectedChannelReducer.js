// Actions
const CHANNEL_SELECT_USER_LOADING = "CHANNEL_SELECT_USER_LOADING";
const CHANNEL_SELECT_USER_LOADED = "CHANNEL_SELECT_USER_LOADED";
const CHANNEL_SELECT_USER_LOADING_FAILED = "CHANNEL_SELECT_USER_LOADING_FAILED";
const CHANNEL_DESELECT = "CHANNEL_DESELECT";

const ChannelSelectUserLoading = (payload) => {
  return {
    type: CHANNEL_SELECT_USER_LOADING,
    payload,
  };
};

const ChannelDeselect = () => {
  return {
    type: CHANNEL_DESELECT,
  };
};

const ChannelSelectUserLoaded = (payload) => {
  return {
    type: CHANNEL_SELECT_USER_LOADED,
    payload,
  };
};

const ChannelSelectUserLoadingFailed = () => {
  return {
    type: CHANNEL_SELECT_USER_LOADING_FAILED,
  };
};

const SelectChannel = (id) => (dispatch, getState) => {
  const state = getState().variables.selectedChannel;
  if (state.id == id) {
    return;
  }

  dispatch(ChannelSelectUserLoading(id));

  try {
    fetch(`http://127.0.0.1:5000/api/user/${id}`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => dispatch(ChannelSelectUserLoaded(user)));
      } else {
        dispatch(ChannelSelectUserLoadingFailed());
      }
    });
  } catch {
    dispatch(ChannelSelectUserLoadingFailed());
  }
};

//

// Reducer Itself
const State = {
  id: null,
  user: null,
  isFetching: false,
};

const SelectedChannelReducer = (state = State, action) => {
  switch (action.type) {
    case CHANNEL_SELECT_USER_LOADING:
      console.log(action);
      return {
        ...state,
        id: action.payload,
        user: null,
        isFetching: true,
      };

    case CHANNEL_DESELECT:
      return {
        ...state,
        id: null,
        user: null,
        isFetching: false,
      };

    case CHANNEL_SELECT_USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isFetching: false,
      };

    case CHANNEL_SELECT_USER_LOADING_FAILED:
      return {
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default SelectedChannelReducer;
export { SelectChannel };
