import { connect } from "react-redux";
import Watchlist from "./Watchlist/Watchlist";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../../components/UI/Spinner/Spinner";
import FinancialStatements from "../../components/FinancialStatements/FinancialStatements";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "50px",
    paddingBottom: "20px",
  },
}));

const Analysis = (props) => {
  const classes = useStyles();
  const { loading } = props;
  const watchlist = props.watchlist
    ? props.watchlist.map((ticker, index) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Watchlist ticker={ticker["ticker"]} key={index} />
          </Grid>
        );
      })
    : null;
  return (
    <div>
      {watchlist ? (
        <Grid container spacing={4} className={classes.gridContainer}>
          {watchlist}
        </Grid>
      ) : null}
      {loading ? <Spinner /> : null}
      {props.statements ? (
        <FinancialStatements className={classes.FinancialStatements} />
      ) : null}
    </div>
  );
};

const mapPropsToState = (state) => {
  return {
    watchlist: state.watchlist.watchlist,
    loading: state.watchlist.loading,
    statements: state.watchlist.statements,
  };
};

export default connect(mapPropsToState)(Analysis);
