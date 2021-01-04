import * as actionTypes from "./actionTypes";
import axios from "axios";

export const initWatchlist = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:5000/api/watchlist/");
      const data = res.data;
      dispatch(initReturnSuccess(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const autoUpdateWatchlist = (autoUpdateInterval) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/watchlist/currentPrice"
      );
      const data = res.data;
      console.log(data);
      dispatch(autoUpdateReturnSuccess(data));
    } catch (err) {
      console.log(err);
      clearInterval(autoUpdateInterval);
    }
  };
};

export const addToWatchlist = (watchlistStock) => {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:5000/api/watchlist/", {
        ticker: watchlistStock.ticker,
        companyName: watchlistStock.companyName,
        priceAdded: watchlistStock.price,
        currentPrice: watchlistStock.price,
        targetPrice: watchlistStock.targetPrice,
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

export const autoUpdateReturnSuccess = (watchlist) => {
  return {
    type: actionTypes.WATCHLIST_AUTOUPDATE_SUCCESS,
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
    ticker: ticker,
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

export const clearAnalysis = () => {
  return {
    type: actionTypes.ANALYSIS_CLEAR,
  };
};

export const addTargetPrice = (ticker, target) => {
  return async (dispatch) => {
    dispatch(initTargetSet());
    console.log(ticker, target);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/watchlist/${ticker}`,
        {
          targetPrice: "" + target,
        }
      );
      const watchlist = res.data;
      console.log(watchlist);
      dispatch(targetSetSuccess(watchlist));
    } catch (err) {
      console.log(err);
      dispatch(targetSetFailure);
    }
  };
};

export const initTargetSet = () => {
  return {
    type: actionTypes.WATCHLIST_SET_TARGET_INIT,
  };
};

export const targetSetSuccess = (watchlist) => {
  return {
    type: actionTypes.WATCHLIST_SET_TARGET_SUCCESS,
    watchlist: watchlist,
  };
};

export const targetSetFailure = () => {
  return {
    type: actionTypes.WATCHLIST_SET_TARGET_FAILURE,
  };
};

export const removeWatchlist = (stock) => {
  return async (dispatch) => {
    dispatch(removeWatchlistInit());
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/watchlist/${stock}`
      );
      const data = res.data;
      dispatch(removeWatchlistSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(removeWatchlistFailure(err));
    }
  };
};

export const removeWatchlistInit = () => {
  return {
    type: actionTypes.WATCHLIST_REMOVE_INIT,
  };
};

export const removeWatchlistSuccess = (watchlist) => {
  return {
    type: actionTypes.WATCHLIST_REMOVE_SUCCESS,
    watchlist: watchlist,
  };
};

export const removeWatchlistFailure = (err) => {
  return {
    type: actionTypes.WATCHLIST_REMOVE_FAILURE,
    error: err,
  };
};
