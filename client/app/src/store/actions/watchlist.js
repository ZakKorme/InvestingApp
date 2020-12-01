import * as actionTypes from "./actionTypes";
import axios from "axios";

export const initWatchlist = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:5000/api/watchlist/");
      const data = res.data;
      console.log(data);
      dispatch(initReturnSuccess(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToWatchlist = (scanTicker) => {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:5000/api/watchlist/", {
        ticker: scanTicker,
      });
      dispatch(returnSuccess());
    } catch (err) {
      console.log(err);
      dispatch(returnFailure());
    }
  };
};

export const initReturnSuccess = (watchlist) => {
  return {
    type: actionTypes.WATCHLIST_INIT_SUCCESS,
    watchlist: watchlist,
  };
};

export const returnSuccess = () => {
  return {
    type: actionTypes.WATCHLIST_SUCCESS,
  };
};

export const returnFailure = () => {
  return {
    type: actionTypes.WATCHLIST_SUCCESS,
  };
};
