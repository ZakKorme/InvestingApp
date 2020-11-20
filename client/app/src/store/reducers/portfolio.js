import * as actionTypes from "../actions/actionTypes";

const inititalState = {
  error: null,
  loading: false,
  portfolio: {},
};

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case actionTypes.PORTFOLIO_SUCCESS:
      return {
        ...state,
        portfolio: action.portfolioData,
      };
    case actionTypes.PORTFOLIO_FAILURE:
      return {
        ...state,
        error: true,
      };
    case actionTypes.RETURNS_INIT:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.RETURNS_SUCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.RETURNS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
