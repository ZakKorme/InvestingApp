import React from "react";
import classes from "../FinancialStatements.module.css";

const CashFlow = (props) => {
  let cashFlow = props.cashFlow ? props.cashFlow.map(data => {
    let value = Object.keys(data)[0];
    return (
      <div key={value} className={classes.FinancialStatementItems}>
      <h4>{value}</h4>
      <p>{data[value]}</p>
      </div>
    );
  })  : null;
  return (
    <div className={classes.FinancialStatements}>
      {cashFlow}
    </div>
  );
};

export default CashFlow;
