import React from "react";
import { connect } from "react-redux";
import PortfolioCard from "../../components/UI/PortfolioCard/PortfolioCard";
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
    portfolio.length >= 1
      ? portfolio.map((stocks) => {
          let ticker = stocks["tickerSymbol"];
          let price = stocks["purchasedPrice"];
          let quantity = stocks["numberOfShares"];
          let currentPrice = stocks["currentPrice"];
          return (
            <Grid item xs={12} sm={6} md={4} key={ticker}>
              <PortfolioCard
                key={ticker}
                ticker={ticker}
                price={price}
                quantity={quantity}
                current={currentPrice}
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

export default connect(mapStateToProps)(Home);
