import * as actionTypes from "./actionTypes";
import axios from "axios";

export const initPortfolio = () => {
  return (dispatch) => {
    const url = "localhost:5000/api/portfolio";
    axios
      .get(url)
      .then((res) => {
        const portfolio = res.json();
        dispatch(setPortfolio(portfolio));
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
