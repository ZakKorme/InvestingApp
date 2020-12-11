import { connect } from "react-redux";
import classes from "./Portfolio.module.css";
import WatchlistTable from "../../components/UI/WatchlistTable/WatchlistTable";
import PorfolioTable from "../../components/UI/PortfolioTable/PortfolioTable";
import Grid from "@material-ui/core/Grid";

const Portfolio = (props) => {
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.gridContainer}
      >
        <h4 style={{ width: "48%", textAlign: "center", fontFamily: "" }}>
          Watchlist
        </h4>
        <h4 style={{ width: "48%", textAlign: "center", fontFamily: "" }}>
          Portfolio
        </h4>
        <WatchlistTable watchlist={props.watchlist} width={{ width: "50%" }} />
        <PorfolioTable portfolio={props.portfolio} width="50%" />
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    portfolio: state.portfolio.portfolio,
    watchlist: state.watchlist.watchlist,
  };
};
export default connect(mapStateToProps)(Portfolio);
