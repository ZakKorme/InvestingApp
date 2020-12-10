import React from "react";
import classes from "../FinancialStatements.module.css";

const BalanceSheet = (props) => {
  let balanceSheet = props.balanceSheet
    ? props.balanceSheet.map((data, index) => {
        let value = Object.keys(data)[0];
        return (
          <div key={index} className={classes.FinancialStatementItems}>
            <h4>{value}:</h4>
            <p>{data[value]}</p>
          </div>
        );
      })
    : null;
  return (
    <div>
      <div className={classes.Title}>
        <h2>{props.ticker} Finanacials</h2>
      </div>
      <div className={classes.FinancialStatements}>{balanceSheet}</div>
    </div>
  );
};

export default BalanceSheet;
