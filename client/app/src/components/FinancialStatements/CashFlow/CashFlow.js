import React from "react";
import classes from "../FinancialStatements.module.css";

const CashFlow = (props) => {
  const cashFlow = props.cashFlow
    ? props.cashFlow.map((data, index) => {
        const value = Object.keys(data)[0];
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
      <div className={classes.FinancialStatements}>{cashFlow}</div>
    </div>
  );
};

export default CashFlow;
