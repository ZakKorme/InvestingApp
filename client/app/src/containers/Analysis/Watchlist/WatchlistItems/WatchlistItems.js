import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import Switch from "@material-ui/core/Switch";
import Avatar from "@material-ui/core/Avatar";

import { getAnalysis } from "../../../../store/actions/watchlist";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    flexWrap: "wrap",
    padding: "20px",
  },
  Avatar: {
    display: "center",
    paddingBottom: "10px",
  },
  divInLine: {
    display: "block",
    paddingTop: "5px",
  },
}));

const WatchlistItem = (props) => {
  const [switchHandler, setSwitchHandler] = useState(false);
  const classes = useStyles();

  const onChangeHandler = async (event) => {
    setSwitchHandler(event.target.checked);
    if (event.target.checked) {
      await props.getAnalysis(props.ticker);
    }
    setSwitchHandler(!event.target.checked);
  };

  return (
    <div>
      <div>
          <Avatar>{props.ticker.split("")[0]}</Avatar>
          <div className={classes.divInLine}>
            <strong>Stock</strong>: {props.ticker}
          </div>
          <div className={classes.divInLine}>
            <strong>Added Date</strong>:{props.dateAdded}
          </div>
          <div className={classes.divInLine}>
            <strong>Added Price</strong>:{props.priceAdded}
          </div>
          <div className={classes.divInLine}>
            <strong>Weekly Change Price</strong>: {props.dateAdded}
          </div>
          <Switch
            color="primary"
            onChange={onChangeHandler}
            checked={switchHandler}
          ></Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    statements: state.watchlist.statements,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAnalysis: (ticker) => dispatch(getAnalysis(ticker)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistItem);
