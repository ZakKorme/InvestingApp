import React from "react";
import { connect } from "react-redux";
import PortfolioCard from "../../components/UI/PortfolioCard/PortfolioCard";
import { calculateReturns } from "../../store/actions/portfolio";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "50px",
  },
});

const Home = (props) => {
  const classes = useStyles();
  const { portfolio } = props;
  const portfolioData =
    portfolio.length > 1
      ? portfolio.map((stocks) => {
          const ticker = stocks["tickerSymbol"];
          const price = stocks["purchasedPrice"];
          const quantity = stocks["numberOfShares"];
          return (
            <Grid item xs={12} sm={6} md={4} key={ticker}>
              <PortfolioCard
                key={ticker}
                ticker={ticker}
                price={price}
                quantity={quantity}
              />
            </Grid>
          );
        })
      : null;
  return (
    <Grid container spacing={4} className={classes.gridContainer}>
      {portfolioData}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    portfolio: state.portfolio.portfolio,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    calculateReturn: () => dispatch(calculateReturns()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
