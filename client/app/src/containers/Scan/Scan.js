import React, { useState } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Table from "../../components/UI/Table/Table";
import { initScanning } from "../../store/actions/scanner";

const Scan = (props) => {
  const [ticker, setTicker] = useState("");
  const [scanDataColumns, setScanDataColumns] = useState(null);
  const [scanDataRows, setScanDataRows] = useState(null);

  const onClickHandler = async (e) => {
    const [scanDataColumns, scanDataRows] = await props.initScan(ticker);
    setScanDataColumns(scanDataColumns);
    setScanDataRows(scanDataRows);
  };
  const onChangeHandler = (e) => {
    setTicker(e.target.value);
  };

  return (
    <div>
      <Input changed={onChangeHandler} />
      <Button clicked={onClickHandler}>Scan</Button>
      <div>
        {scanDataColumns && scanDataRows ? <Table rows={scanDataRows} /> : null}
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
