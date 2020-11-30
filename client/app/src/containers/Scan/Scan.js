import React, { useState } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Table from "../../components/UI/Table/Table";
import { initScanning } from "../../store/actions/scanner";
import Spinner from "../../components/UI/Spinner/Spinner";

const Scan = (props) => {
  const [ticker, setTicker] = useState("");
  const [scanDataColumns, setScanDataColumns] = useState(null);
  const [scanDataRows, setScanDataRows] = useState(null);
  const [loading, setLoading] = useState(false);

  const onClickHandler = async (e) => {
    setLoading(true);
    setScanDataColumns(null);
    setScanDataRows(null);
    const [keys, ...rowData] = await props.initScan(ticker);
    setLoading(false);
    console.log(rowData);
    setScanDataColumns(keys);
    setScanDataRows(rowData);
  };
  const onChangeHandler = (e) => {
    setTicker(e.target.value);
  };

  return (
    <div>
      <Input changed={onChangeHandler} />
      <Button clicked={onClickHandler}>Scan</Button>
      <div>
        {scanDataColumns && scanDataRows ? (
          <div>
            <Table rows={scanDataRows} />
            <Button>ADD TO WATCHLIST</Button>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Scan);
