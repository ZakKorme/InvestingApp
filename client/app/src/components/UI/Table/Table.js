import { makeStyles } from "@material-ui/core/styles";
import Tables from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Table = (props) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Tables className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Pirce</TableCell>
            <TableCell align="right">MarketCap</TableCell>
            <TableCell align="right">52-Week Range</TableCell>
            <TableCell align="right">Volume</TableCell>
            <TableCell align="right">P/E</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows ? (
            <TableRow>
              <TableCell align="right">{props.rows[0]}</TableCell>
              <TableCell align="right">{props.rows[1]}</TableCell>
              <TableCell align="right">{props.rows[2]}</TableCell>
              <TableCell align="right">{props.rows[3]}</TableCell>
              <TableCell align="right">{props.rows[4]}</TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Tables>
    </TableContainer>
  );
};

export default Table;
