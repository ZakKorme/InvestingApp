import React from "react";
import { connect } from "react-redux";
import PortfolioCard from "../../components/UI/PortfolioCard/PortfolioCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import financeImage from "../../public/undraw_finance_0bdk (1).svg";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "22px",
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
          <p style={{ fontSize: "50px", fontFamily: "Roboto" }}>
            "Price is what you pay. Value is what you get."
          </p>
          <p style={{ fontSize: "50px", fontFamily: "Roboto" }}>
            {" "}
            - Warren Buffet
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
