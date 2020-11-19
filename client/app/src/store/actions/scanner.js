import * as actionTypes from "./actionTypes";
import axios from "axios";
// import { getDailyPrice } from "../../shared/utility";

export const initScanning = (scanTicker) => {
  return async (dispatch) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${scanTicker}&apikey=UDD24BMW6C2TS3V7`;
    try {
      const res = await axios.get(url);
      const data = res.data["Time Series (Daily)"];
      const columns = Object.keys(data["2020-11-18"]);
      const rows = [];
      let counter = 0;
      for (let val in data["2020-11-18"]) {
        let key = columns[counter];
        rows.push({ [key]: data["2020-11-18"][val] });
        counter++;
      }
      console.log(rows);
      dispatch(scanSucess);
      return [columns, rows];
    } catch (err) {
      dispatch(scanFailure(err));
      console.error(err);
    }
  };
};

export const scanSucess = (data) => {
  return {
    type: actionTypes.SCAN_SUCCESS,
    data: data,
  };
};

export const scanFailure = (err) => {
  return {
    type: actionTypes.SCAN_FAILURE,
    error: err,
  };
};
