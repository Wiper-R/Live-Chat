import Http from "../../../http";

const RELATIONSHIPS_LOADED = "RELATIONSHIPS_LOADED";
const RELATIONSHIPS_LOADING = "RELATIONSHIPS_LOADING";
const RELATIONSHIPS_LOADING_FAILED = "RELATIONSHIPS_LOADING_FAILED";
const RELATIONSHIP_FILTER_CHANGED = "RELATIONSHIP_FILTER_CHANGED";

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

const RelationshipFilterChanged = (filter) => {
  return {
    type: RELATIONSHIP_FILTER_CHANGED,
    payload: filter,
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
  filter: "online",
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

    case RELATIONSHIP_FILTER_CHANGED:
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};

export default RelationshipReducer;
export { RelationshipFilterChanged, LoadRelationships };
