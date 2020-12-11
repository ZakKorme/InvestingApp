const express = require("express");
const router = express.Router();
const scrapeStock = require("../utility/scrape/stock");
const scrapeBalanceSheet = require("../utility/scrape/balancesheet");
const scrapeCashFlow = require("../utility/scrape/cashflow");
const scrapeIncomeStatement = require("../utility/scrape/incomestatement");

//GET : realtime data on specific stock
router.get("/:id", async (req, res) => {
  let stockData = null;
  try {
    const ticker = req.params.id;
    stockData = await scrapeStock(ticker);
  } catch (err) {
    console.error(err);
  }
  res.send(stockData);
});

//GET : realtime financials on specific stock
router.get("/financials/:id", async (req, res) => {
  let stock = req.params.id;
  let balanceSheet, cashFlow, incomeStatement;
  let urlBalanceSheet = `https://finance.yahoo.com/quote/${stock}/balance-sheet?p=${stock}`;
  let urlCashFlow = `https://finance.yahoo.com/quote/${stock}/cash-flow?p=${stock}`;
  let urlIncomeStatement = `https://finance.yahoo.com/quote/${stock}/financials?p=${stock}`;

  try {
    console.log("BalanceSheet");
    balanceSheet = await scrapeBalanceSheet(urlBalanceSheet);
    console.log("CashFlow");
    cashFlow = await scrapeCashFlow(urlCashFlow);
    console.log("IncomeStatement");
    incomeStatement = await scrapeIncomeStatement(urlIncomeStatement);
  } catch (err) {
    console.log(err);
  }

  let statements = { balanceSheet, cashFlow, incomeStatement };
  res.send(statements);
});

module.exports = router;
