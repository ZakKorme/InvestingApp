import * as actionTypes from "../actions/actionTypes";

const initialState = {
  watchlist: null,
  loading: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WATCHLIST_INIT_SUCCESS:
      return {
        ...state,
        watchlist: action.watchlist,
      };
    case actionTypes.WATCHLIST_SUCCESS:
      return { ...state };
    case actionTypes.WATCHLIST_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.ANALYSIS_INIT:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ANALYSIS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
