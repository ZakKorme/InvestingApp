import * as actionTypes from "../actions/actionTypes";

const initialState = {
  watchlist: null,
  ticker: null,
  statements: null,
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
        statements: null,
        ticker: action.ticker,
      };
    case actionTypes.ANALYSIS_SUCCESS:
      return {
        ...state,
        loading: false,
        statements: action.statements,
      };
    case actionTypes.ANALYSIS_FAILURE:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
