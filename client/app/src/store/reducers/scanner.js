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
        ...initialState,
        scanData: action.data,
      };
    case actionTypes.SCAN_FAILURE:
      return {
        ...initialState,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
