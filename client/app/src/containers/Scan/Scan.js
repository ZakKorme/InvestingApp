import React, { useState } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Table from "../../components/UI/Table/Table";
import { initScanning } from "../../store/actions/scanner";

const Scan = (props) => {
  const [ticker, setTicker] = useState("");
  const [scanData, setScanData] = useState(null);

  const onClickHandler = async (e) => {
    const data = await props.initScan(ticker);
    setScanData(data);
  };
  const onChangeHandler = (e) => {
    setTicker(e.target.value);
  };

  return (
    <div>
      <Input changed={onChangeHandler} />
      <Button clicked={onClickHandler}>Scan</Button>
      <div>{scanData ? <Table rows={scanData} /> : null}</div>
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
