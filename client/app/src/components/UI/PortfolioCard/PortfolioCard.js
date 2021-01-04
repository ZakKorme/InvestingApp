import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardHeader } from "@material-ui/core";
import { Avatar } from "@material-ui/core";

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
  const classes = useStyles();

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
          <strong>Price: </strong> ${props.price}
        </Typography>
        <Typography variant="body2">
          <strong>Shares: </strong> {props.quantity}
        </Typography>
        <Typography variant="body2">
          <strong>Current Price: </strong>${props.current}
        </Typography>
        <Typography component={"span"} variant="body2">
          <strong>Total Returns: </strong>$
          {((props.current - props.price) * props.quantity).toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    portfolio: state.portfolio.portfolio,
  };
};

export default connect(mapStateToProps)(PortfolioCard);
