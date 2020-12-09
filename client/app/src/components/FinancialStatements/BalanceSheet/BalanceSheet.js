import React from "react";
import classes from "../FinancialStatements.module.css";

const BalanceSheet = (props) => {
  let balanceSheet = props.balanceSheet ? props.balanceSheet.map(data => {
    let value = Object.keys(data)[0];
    return (
      <div key={value} className={classes.FinancialStatementItems} >
      <h4>{value}</h4>
      <p>{data[value]}</p>
      </div>
    );
  })  : null;
  return (
    <div className={classes.FinancialStatements}>
      {balanceSheet}
    </div>
  );
};

export default BalanceSheet;
