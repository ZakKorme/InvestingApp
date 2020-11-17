import * as actionTypes from "./actionTypes";
import axios from "axios";

export const initScanning = (scanTicker) => {
  return (dispatch) => {
    const url = "";
    axios
      .get(url)
      .then((res) => {
        dispatch(scanSucess(res));
      })
      .catch((err) => {
        dispatch(scanFailure(err));
      });
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
