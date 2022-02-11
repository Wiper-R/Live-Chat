import Http from "../../../http";

const RELATIONSHIPS_LOADED = "RELATIONSHIPS_LOADED";
const RELATIONSHIPS_LOADING = "RELATIONSHIPS_LOADING";
const RELATIONSHIPS_LOADING_FAILED = "RELATIONSHIPS_LOADING_FAILED";

const RelationshipsLoading = () => {
  return {
    type: RELATIONSHIPS_LOADING,
  };
};

const RelationshipsLoaded = (friends) => {
  return {
    type: RELATIONSHIPS_LOADED,
    payload: friends,
  };
};

const RelationshipsLoadingFailed = (err) => {
  return {
    type: RELATIONSHIPS_LOADING_FAILED,
    payload: err,
  };
};

const LoadRelationships = () => (dispatch, getState) => {
  dispatch(RelationshipsLoading());
  new Http("relationships/@me", "GET").request().then(({ data, error }) => {
    if (!error) {
      dispatch(RelationshipsLoaded(data));
    } else {
      dispatch(RelationshipsLoadingFailed(error));
    }
  });
};

// Reducer
const State = {
  data: [],
  isFetching: false,
};

const RelationshipReducer = (state = State, action) => {
  switch (action.type) {
    case RELATIONSHIPS_LOADING:
      return {
        ...state,
        isFetching: true,
        data: [],
      };

    case RELATIONSHIPS_LOADED:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };

    case RELATIONSHIPS_LOADING_FAILED:
      return {
        ...state,
        isFetching: false,
        data: [],
      };

    default:
      return state;
  }
};

export default RelationshipReducer;
export { LoadRelationships };
