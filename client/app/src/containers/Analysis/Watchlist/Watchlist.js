import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import Avatar from "@material-ui/core/Avatar";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {
  initAnalysis,
  successAnalysis,
} from "../../../store/actions/watchlist";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    flexWrap: "wrap",
    padding: "20px",
  },
  Avatar: {
    display: "center",
  },
}));

const Watchlist = (props) => {
  const [switchHandler, setSwitchHandler] = useState(false);
  const classes = useStyles();

  const onChangeHandler = (event) => {
    setSwitchHandler(event.target.checked);
    if (event.target.checked) {
      props.initAnalysis();
      setTimeout(() => {
        props.successAnalysis();
        setSwitchHandler(false);
      }, 2000);
    }
  };
  return (
    <div>
      <div>
        <Paper elevation={3} className={classes.root}>
          <Avatar>{props.ticker.split("")[0]}</Avatar>
          <strong>Stock</strong>: {props.ticker}
          <Switch
            color="primary"
            onChange={onChangeHandler}
            checked={switchHandler}
          ></Switch>
        </Paper>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    initAnalysis: () => dispatch(initAnalysis()),
    successAnalysis: () => dispatch(successAnalysis()),
  };
};

export default connect(null, mapDispatchToProps)(Watchlist);