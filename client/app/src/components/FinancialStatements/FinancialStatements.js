import React, { useState } from "react";
import { connect } from 'react-redux';
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import AppBar from "@material-ui/core/AppBar";
import TabList from "@material-ui/lab/TabList";

import BalanceSheet from "./BalanceSheet/BalanceSheet";
import CashFlow from "./CashFlow/CashFlow";
import IncomeStatement from "./IncomeStatement/IncomeStatement";

const FinancialStatements = (props) => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <AppBar position="static">
        <TabList onChange={handleChange} aria-label="simple tabs example" centered>
          <Tab label="Balance Sheet" value="1" />
          <Tab label="Cash Flow" value="2" />
          <Tab label="Income Statement" value="3" />
        </TabList>
      </AppBar>
      <TabPanel value="1">
        <BalanceSheet balanceSheet={props.balanceSheet} ticker={props.ticker}/>
      </TabPanel>
      <TabPanel value="2">
        <CashFlow cashFlow={props.cashFlow} ticker={props.ticker}/>
      </TabPanel>
      <TabPanel value="3">
        <IncomeStatement
          incomeStatement={props.incomeStatement}
          ticker={props.ticker}
        />
      </TabPanel>
    </TabContext>
  );
};

const mapStateToProps = (state) => {
  return {
    balanceSheet: state.watchlist.statements.balanceSheet,
    cashFlow: state.watchlist.statements.cashFlow,
    incomeStatement: state.watchlist.statements.incomeStatement,
    ticker: state.watchlist.ticker
  }
}
export default connect(mapStateToProps)(FinancialStatements);
