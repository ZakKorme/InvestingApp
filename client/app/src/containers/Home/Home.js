import React from "react";
import { connect } from "react-redux";
import PortfolioCard from "../../components/UI/PortfolioCard/PortfolioCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import financeImage from "../../public/undraw_finance_0bdk (1).svg";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "22px",
  },
  Quote: {
    fontSize: "25px",
    fontFamily: "Roboto",
    display: "inline",
  },
  priceIncrease: {
    color: "green",
    paddingLeft: "10px",
  },
  priceDecrease: {
    color: "red",
    paddingLeft: "10px",
  },
});

const Home = (props) => {
  const classes = useStyles();
  const { portfolio } = props;
  const portfolioData =
    portfolio.length > 0
      ? portfolio.map((stocks) => {
          const ticker = stocks["tickerSymbol"];
          const price = stocks["purchasedPrice"];
          const quantity = stocks["numberOfShares"];
          const currentPrice = stocks["currentPrice"];

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
      <Grid container>
        <Grid
          item
          sm={6}
          style={{
            backgroundColor: "#F9F9F9",
            paddingTop: "100px",
            paddingBottom: "100px",
            paddingLeft: "50px",
          }}
        >
          <p className={classes.Quote}>
            <strong>S&amp;P 500:</strong>
            <p>
              <span>3,714.24</span>
              <ArrowDownwardIcon className={classes.priceDecrease} /> -73.14
              (-1.93%)
            </p>
          </p>
          <p className={classes.Quote}>
            <strong>NASDAQ:</strong>
            <p className={classes.price}>
              <span>13,070.69</span>
              <ArrowDownwardIcon className={classes.priceDecrease} /> -266.46
              (-2.00%)
            </p>
          </p>
          <p className={classes.Quote}>
            <strong>DOW 30:</strong>
            <p>
              <span>29,982.62</span>
              <ArrowUpwardIcon className={classes.priceIncrease} /> 602.56
              (+2.04%)
            </p>
          </p>
          <p className={classes.Quote}>
            <strong>RUSSEL 2000:</strong>
            <p>
              <span>2,073.64</span>
              <ArrowUpwardIcon className={classes.priceIncrease} /> 80.98
              (+5.78%)
            </p>
          </p>
        </Grid>
        <Grid
          item
          sm={6}
          style={{
            backgroundColor: "#F9F9F9",
            paddingTop: "100px",
            paddingBottom: "100px",
          }}
        >
          <div>
            <img width={"100%"} height={350} src={financeImage} alt="finance" />
          </div>
        </Grid>
      </Grid>
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
