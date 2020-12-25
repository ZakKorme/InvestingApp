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
      const res = await axios.get(url);
      const data = res.data;
      currentPrice = +getDailyPrice(data);
      dispatch(returnsSuccess());
    } catch (err) {
      dispatch(returnsFailure());
      return console.error(err);
    }

    const totalReturn = (currentPrice - price) * shares;
    return [currentPrice.toFixed(2), +totalReturn.toFixed(2)];
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


export const addToPortfolio = (stock) => {
  return async (dispatch) => {
    dispatch(initAddToPortfolio());
    try {
      const res = axios.post("http://localhost:5000/api/portfolio", {
        tickerSymbol: stock.ticker,
        companyName: stock.companyName,
        purchasedPrice: stock.price,
        currentPrice: stock.price,
        numberOfShares: stock.shares
      });
      const data = res.data;
      dispatch(addToPortfolioSuccess(data));    
    } catch (err) {
      console.log(err);
      dispatch(addToPortfolioFailure(err));
    }
  };
};

export const initAddToPortfolio = () => {
  return {
    type: actionTypes.PORTFOLIO_ADD_INIT,
  };
};

export const addToPortfolioSuccess = (portfolio) => {
  return {
    type: actionTypes.PORTFOLIO_ADD_SUCCESS,
    portfolio: portfolio
  }
};

export const addToPortfolioFailure = (err) => {
  return {
    type: actionTypes.PORTFOLIO_ADD_FAILURE,
    error: err
  }
};


export const removePortfolio = (stock) => {
  return async (dispatch) => {
    dispatch(removePortfolioInit());
    try {
      const res = await axios.delete(`http://localhost:5000/api/portfolio/${stock}`);
      const data = res.data;
      dispatch(removePortfolioSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(removePortfolioFailure(err))
    }
  };
};

export const removePortfolioInit = () => {
  return {
    type: actionTypes.PORTFOLIO_REMOVE_INIT,
  };
};

export const removePortfolioSuccess = (portfolio) => {
  return {
    type: actionTypes.PORTFOLIO_REMOVE_SUCCESS,
    portfolio: portfolio
  };
};

export const removePortfolioFailure = (err) => {
  return {
    type: actionTypes.PORTFOLIO_REMOVE_FAILURE,
    error: err,
  };
};
