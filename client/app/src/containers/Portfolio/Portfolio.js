import { connect } from "react-redux";
import classes from "./Portfolio.module.css";
import WatchlistTable from "../../components/UI/WatchlistTable/WatchlistTable";
import PorfolioTable from "../../components/UI/PortfolioTable/PortfolioTable";
import Grid from "@material-ui/core/Grid";
import StockInputFields from "../../components/StockInputFields/StockInputFields";

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
        <StockInputFields style={{ width: "100%" }} />
      </Grid>
      <div className={classes.TableDiv}>
        <div classNameq={classes.items}>
          <h2 className={classes.Title2}>Watchlist</h2>
          <WatchlistTable watchlist={props.watchlist} />
        </div>
        <div>
          <h2 className={classes.Title2}>Portfolio</h2>
          <PorfolioTable portfolio={props.portfolio} />
        </div>
      </div>
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
