import React from "react";
import classes from "../FinancialStatements.module.css";

const IncomeStatement = (props) => {
  let incomeStatement = props.incomeStatement ? props.incomeStatement.map(data => {
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
      {incomeStatement}
    </div>
  );
};

export default IncomeStatement;
