import React, { useState } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Table from "../../components/UI/Table/Table";
import { initScanning } from "../../store/actions/scanner";
import { addToWatchlist } from "../../store/actions/watchlist";
import Spinner from "../../components/UI/Spinner/Spinner";

const Scan = (props) => {
  const [ticker, setTicker] = useState("");
  const [scanDataColumns, setScanDataColumns] = useState(null);
  const [scanDataRows, setScanDataRows] = useState(null);
  const [loading, setLoading] = useState(false);

  const onScanClickHandler = async (e) => {
    loadingHandler();
    const [keys, ...rowData] = await props.initScan(ticker);
    console.log(keys, rowData);
    setLoading(false);
    setScanDataColumns(keys);
    setScanDataRows(rowData);
  };
  const loadingHandler = () => {
    setLoading(true);
    setScanDataColumns(null);
    setScanDataRows(null);
  };

  const onChangeHandler = (e) => {
    setTicker(e.target.value);
  };

  const onWatchlistHandler = async () => {
    const scanTicker = ticker;
    await props.addToWatchList(scanTicker);
    console.log("Added to Watchlist");
  };

  return (
    <div>
      <Input changed={onChangeHandler} />
      <Button clicked={onScanClickHandler}>Scan</Button>
      <div>
        {scanDataColumns && scanDataRows ? (
          <div>
            <Table rows={scanDataRows} />
            <Button clicked={onWatchlistHandler}>ADD TO WATCHLIST</Button>
          </div>
        ) : null}
        {loading ? <Spinner /> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ticker: state.scanner.scanTicker,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initScan: (scanTicker) => dispatch(initScanning(scanTicker)),
    addToWatchList: (scanTicker) => dispatch(addToWatchlist(scanTicker)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Scan);
