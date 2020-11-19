import * as actionTypes from "./actionTypes";
import axios from "axios";
import { getDailyPrice } from "../../shared/utility";

export const initPortfolio = () => {
  return (dispatch) => {
    fetch("/api/portfolio")
      .then((res) => {
        return res.json();
      })
      .then((body) => {
        dispatch(setPortfolio(body));
      })
      .catch((err) => {
        dispatch(fetchPortfolioFailed(err));
      });
  };
};

export const setPortfolio = (portfolio) => {
  return {
    type: actionTypes.PORTFOLIO_SUCCESS,
    portfolioData: portfolio,
  };
};

export const fetchPortfolioFailed = (err) => {
  return {
    type: actionTypes.PORTFOLIO_FAILURE,
    error: err,
  };
};

export const calculateReturns = (ticker, price, shares) => {
  return async (dispatch) => {
    dispatch(initReturns());
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=UDD24BMW6C2TS3V7`;
    let currentPrice = 0;
    try {
      let res = await axios.get(url);
      let data = res.data;
      currentPrice = getDailyPrice(data);
      dispatch(returnsSuccess());
    } catch (err) {
      dispatch(returnsFailure());
      return console.error(err);
    }
    console.log(currentPrice);
    let totalReturn = (currentPrice - price) * shares;
    return totalReturn.toFixed(2);
  };
};

export const initReturns = () => {
  return {
    type: actionTypes.RETURNS_INIT,
  };
};

export const returnsSuccess = () => {
  return {
    type: actionTypes.RETURNS_SUCESS,
  };
};

export const returnsFailure = () => {
  return {
    type: actionTypes.RETURNS_FAILURE,
  };
};
