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
        ...inititalState,
        portfolio: action.portfolioData,
      };
    case actionTypes.PORTFOLIO_FAILURE:
      return {
        ...inititalState,
        error: true,
      };
    case actionTypes.RETURNS_INIT:
      return {
        ...inititalState,
        loading: true,
      };
    case actionTypes.RETURNS_SUCESS:
      return {
        ...inititalState,
        loading: false,
      };
    case actionTypes.RETURNS_FAILURE:
      return {
        ...inititalState,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
