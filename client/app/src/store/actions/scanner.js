import * as actionTypes from "./actionTypes";
import axios from "axios";
// import { getDailyPrice } from "../../shared/utility";

export const initScanning = (scanTicker) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/scrape/` + scanTicker
      );
      const data = res.data;
      const keys = Object.keys(data);
      dispatch(scanSucess);
      return [
        keys,
        data.price,
        data.companyName,
        data.marketCap,
        data.range52Week,
        data.volume,
        data.pe,
      ];
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
