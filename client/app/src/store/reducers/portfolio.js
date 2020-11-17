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
    default:
      return state;
  }
};

export default reducer;
