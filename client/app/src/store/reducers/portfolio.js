import * as actionTypes from "../actions/actionTypes";

const inititalState = {
  portfolio: [],
  error: null,
  loading: false,
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
    case actionTypes.PORTFOLIO_ADD_INIT: 
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PORTFOLIO_ADD_SUCCESS:
      return {
        ...state,
        portfolio: action.portfolio,
        loading: false
      };
    case actionTypes.PORTFOLIO_ADD_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case actionTypes.PORTFOLIO_REMOVE_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PORTFOLIO_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        portfolio: action.portfolio,
      };
    case actionTypes.PORTFOLIO_REMOVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state;
  }
};

export default reducer;
