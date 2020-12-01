import * as actionTypes from "../actions/actionTypes";

const initialState = {
  watchlist: null,
  loading: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WATCHLIST_INIT_SUCCESS:
      return {
        ...state,
        watchlist: action.watchlist,
      };
    case actionTypes.WATCHLIST_SUCCESS:
      return {};
    case actionTypes.WATCHLIST_FAILURE:
      return {};
    default:
      return state;
  }
};

export default reducer;
