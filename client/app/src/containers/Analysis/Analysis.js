import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../../components/UI/Spinner/Spinner";
import FinancialStatements from "../../components/FinancialStatements/FinancialStatements";
import WatchlistTable from "../../components/UI/WatchlistTable/WatchlistTable";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "20px",
    paddingTop: "50px",
    paddingBottom: "50px",
  },
}));

const Analysis = (props) => {
  const classes = useStyles();
  const { loading } = props;
  const watchlist = props.watchlist ? (
    <WatchlistTable watchlist={props.watchlist} />
  ) : null;
  return (
    <div>
      {watchlist ? (
        <Grid container spacing={4} className={classes.gridContainer}>
          {watchlist}
        </Grid>
      ) : null}
      {loading ? <Spinner /> : null}
      {props.statements ? <FinancialStatements /> : null}
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
