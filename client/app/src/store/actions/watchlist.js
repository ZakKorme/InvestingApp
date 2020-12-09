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
      dispatch(returnFailure(err));
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

export const returnFailure = (err) => {
  return {
    type: actionTypes.WATCHLIST_SUCCESS,
    error: err,
  };
};

export const initAnalysis = (ticker) => {
  return {
    type: actionTypes.ANALYSIS_INIT,
    ticker: ticker
  };
};

export const getAnalysis = (ticker) => {
  return async (dispatch) => {
    dispatch(initAnalysis(ticker));
    try {
      const res = await axios.get(
        `http://localhost:5000/api/scrape/financials/${ticker}`
      );
      const data = res.data;
      dispatch(successAnalysis(data));
    } catch (err) {
      console.log(err);
      dispatch(failureAnalysis());
    }
  };
};

export const successAnalysis = (statements) => {
  return {
    type: actionTypes.ANALYSIS_SUCCESS,
    statements: statements,
  };
};

export const failureAnalysis = () => {
  return {
    type: actionTypes.ANALYSIS_FAILURE,
  };
};
