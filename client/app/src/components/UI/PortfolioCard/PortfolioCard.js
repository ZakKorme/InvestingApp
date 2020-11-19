import React, { useState } from "react";
import {
  initPortfolio,
  calculateReturns,
} from "../../../store/actions/portfolio";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardHeader } from "@material-ui/core";
import { Avatar } from "@material-ui/core";

import Spinner from "../../UI/Spinner/Spinner";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const PortfolioCard = (props) => {
  const [returns, setReturns] = useState(null);
  const classes = useStyles();

  const onClickHandler = async () => {
    const returnsCalc = await props.calculateReturn(props.ticker, props.price, props.quantity);
    setReturns(returnsCalc);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.ticker.split("")[0]}
          </Avatar>
        }
        title={props.ticker}
      />
      <CardContent>
        <Typography className={classes.title}>
          <strong>Ticker: </strong>
          {props.ticker}
        </Typography>
        <Typography variant="body2" component={"p"}>
          <strong>Price: </strong> {props.price}
        </Typography>
        <Typography variant="body2">
          <strong>Shares: </strong> {props.quantity}
        </Typography>
        <Typography component={"span"} variant="body2">
          <strong>Total Returns: </strong>
          {props.loading ? <Spinner /> : null}
          {returns ? returns : null}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClickHandler}>
          Calculate Return
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    portfolio: state.portfolio.portfolio,
    loading: state.portfolio.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initPortfolio: () => dispatch(initPortfolio()),
    calculateReturn: (ticker, price, quantity) =>
      dispatch(calculateReturns(ticker, price, quantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioCard);