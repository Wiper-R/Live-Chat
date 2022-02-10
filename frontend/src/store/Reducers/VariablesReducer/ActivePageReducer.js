const CHANGE_ACTIVE_PAGE = "CHANGE_ACTIVE_PAGE";
const UNSELECT_ACTIVE_PAGE = "UNSELECT_ACTIVE_PAGE";

const ChangeActivePage = (page) => {
  return {
    type: CHANGE_ACTIVE_PAGE,
    payload: page,
  };
};

const UnselectActivePage = () => {
  return {
    type: UNSELECT_ACTIVE_PAGE,
  };
};

// Page Reducer
const State = [];

const ActivePageReducer = (state = State, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_PAGE:
      return [...action.payload];
    case UNSELECT_ACTIVE_PAGE:
      return [];
    default:
      return state;
  }
};

export default ActivePageReducer;
export { ChangeActivePage, UnselectActivePage };
