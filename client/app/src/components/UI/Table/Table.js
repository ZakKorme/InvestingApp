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
            <TableCell align="right">Open</TableCell>
            <TableCell align="right">High</TableCell>
            <TableCell align="right">Low</TableCell>
            <TableCell align="right">Close</TableCell>
            <TableCell align="right">Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => {
            return (
              <TableRow key={index}>
                <TableCell align="right">{row[0]}</TableCell>
                <TableCell align="right">{row[1]}</TableCell>
                <TableCell align="right">{row[2]}</TableCell>
                <TableCell align="right">{row[3]}</TableCell>
                <TableCell align="right">{row[4]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Tables>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        href="#contained-buttons"
        onClick={props.clicked}
      >
        Add to WatchList
      </Button>
    </TableContainer>
  );
};

export default Table;
