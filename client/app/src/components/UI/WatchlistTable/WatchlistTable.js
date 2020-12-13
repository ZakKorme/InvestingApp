import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import validateWatchlist from "../../../shared/validateWatchlist";
import BusinessIcon from "@material-ui/icons/Business";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { getAnalysis } from "../../../store/actions/watchlist";
import getCurrentPrice from "../../../shared/getCurrentPrice";

const columns = [
  { id: "avatar", label: "#", maxWidth: 80 },
  { id: "ticker", label: "Ticker", maxWidth: 80 },
  { id: "companyName", label: "Company Name", maxWidth: 80 },
  {
    id: "dateAdded",
    label: "Date Added",
    maxWidth: 80,
    align: "right",
  },
  {
    id: "priceAdded",
    label: "Price Added",
    maxWidth: 80,
    align: "right",
  },
  {
    id: "currentPrice",
    label: "Current Price",
    maxWidth: 80,
    align: "right",
  },
  {
    id: "priceChange",
    label: "Price Change",
    maxWidth: 80,
    align: "right",
  },
  {
    id: "action",
    label: "Financials",
    maxWidth: 80,
    align: "right",
  },
];

let rows = [];

const useStyles = makeStyles({
  root: {
    width: "70%",
  },
  container: {
    maxHeight: 340,
  },
});

const WatchlistTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const onClickHandler = useCallback(
    async (event, ticker) => {
      event.preventDefault();
      await props.getAnalysis(ticker);
    },
    [props]
  );

  const updateRows = useCallback(() => {
    if (props.watchlist) {
      rows = [];
      props.watchlist.map((ticker) => {
        // TODO: make validation on watchlist to be faster
        if (!validateWatchlist(rows, ticker["ticker"])) {
          //Will update API To add the follow values: companyName, date and price
          rows.push({
            avatar: (
              <Avatar style={{ backgroundColor: "black" }}>
                {ticker["ticker"].split("")[0]}
              </Avatar>
            ),
            ticker: ticker["ticker"],
            companyName: ticker["companyName"],
            dateAdded: ticker["dateAdded"],
            priceAdded: `$${ticker["priceAdded"]}`,
            currentPrice: `$${ticker["currentPrice"]}`,
            priceChange: `${ticker["priceChange"]}%`,
            action: (
              <IconButton
                onClick={(e) => {
                  onClickHandler(e, ticker["ticker"]);
                }}
              >
                <BusinessIcon />
              </IconButton>
            ),
          });
        }
        return "";
      });
    }
  }, [props.watchlist, onClickHandler]);

  useEffect(() => {
    getCurrentPrice(rows, props.watchlist);
  }, [props.watchlist, updateRows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  updateRows();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow key="top-row">
              {columns.map((column) => {
                return (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rIndex) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.ticker}
                  >
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={`${row.ticker}-${index}-${rIndex}`}
                          align={column.align}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 6, 9]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAnalysis: (ticker) => dispatch(getAnalysis(ticker)),
  };
};

export default connect(null, mapDispatchToProps)(WatchlistTable);
