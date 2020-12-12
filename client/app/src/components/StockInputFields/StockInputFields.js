import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      paddingBottom: "10px",
    },
    input1: {
      marginLeft: "5px",
    },
    input2: {
      paddingTop: "5px",
      paddingBottom: "5px",
    },
  },
}));

const StockInputFields = (props) => {
  const classes = useStyles();
  const [companyName, setCompanyName] = useState("");
  const [ticker, setTicker] = useState("");
  const [price, setPrice] = useState("");
  const [position, setPosition] = useState("");
  const [add, setAdd] = useState("");

  const companyNameHandler = (event) => {
    setCompanyName(event.target.value);
  };

  const tickerHandler = (event) => {
    setTicker(event.target.value);
  };

  const priceHandler = (event) => {
    setPrice(event.target.value);
  };
  const positionHandler = (event) => {
    setPosition(event.target.value);
  };
  const addHandler = (event) => {
    setAdd(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <h2 className={classes.Title}>Add/Remove Position</h2>
      <div className={classes.input1}>
        <div>
          <FormControl style={{ minWidth: 160, paddingLeft: "8px" }}>
            <InputLabel
              id="demo-simple-select-label"
              style={{ paddingLeft: "8px" }}
            >
              Add/Remove
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={add}
              onChange={addHandler}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="Add">Add</MenuItem>
              <MenuItem value="Remove">Remove</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl style={{ minWidth: 160, paddingLeft: "8px" }}>
            <InputLabel
              id="demo-simple-select-label"
              style={{ paddingLeft: "8px" }}
            >
              Postion Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={position}
              onChange={positionHandler}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="Watchlist">Watchlist</MenuItem>
              <MenuItem value="Porfolio">Portfolio</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={classes.input1}>
        <TextField
          id="standard-multiline-flexible"
          label="Company Name"
          multiline
          rowsMax={4}
          value={companyName}
          onChange={companyNameHandler}
        />
        <TextField
          id="standard-textarea"
          label="Ticker"
          value={ticker}
          onChange={tickerHandler}
          multiline
        />
        <TextField
          id="standard-textarea"
          label="Price"
          value={price}
          onChange={priceHandler}
          multiline
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <div
          style={{
            paddingBottom: "40px",
            paddingLeft: "5px",
            paddingTop: "0px",
          }}
        >
          {add && position ? (
            <Button
              variant="contained"
              size="small"
              style={{
                color: "white",
                backgroundColor: "black",
                marginTop: "5px",
              }}
            >
              {add} to {position}
            </Button>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default StockInputFields;
