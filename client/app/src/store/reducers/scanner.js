import * as actionTypes from "../actions/actionTypes";

const initialState = {
  scanTicker: "",
  scanData: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SCAN_SUCCESS:
      return {
        ...state,
        scanData: action.data,
      };
    case actionTypes.SCAN_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
