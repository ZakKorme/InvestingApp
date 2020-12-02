import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";

import BalanceSheet from "./BalanceSheet/BalanceSheet";
import CashFlow from "./CashFlow/CashFlow";
import IncomeStatement from "./IncomeStatement/IncomeStatement";

const FinancialStatements = () => {
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Paper square>
        <Tabs
          centered
          variant="fullWidth"
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab label="Balance Sheet" value="1" />
          <Tab label="Cash Flow Statement" value="2" />
          <Tab label="Income Statement" value="3" />
        </Tabs>
        <TabPanel value="1" index={0}>
          <BalanceSheet />
        </TabPanel>
        <TabPanel value="2" index={1}>
          <CashFlow />
        </TabPanel>
        <TabPanel value="3" index={2}>
          <IncomeStatement />
        </TabPanel>
      </Paper>
    </TabContext>
  );
};
export default FinancialStatements;
