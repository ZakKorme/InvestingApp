const express = require("express");
const router = express.Router();
const stock = require("../utility/scrape/stock");
const scrapeBalanceSheet = require("../utility/scrape/balancesheet");
const scrapeCashFlow = require("../utility/scrape/cashflow");
const scrapeIncomeStatement = require("../utility/scrape/incomestatement");

//GET : realtime data on specific stock
router.get("/:id", async (req, res) => {
  const ticker = req.params.id;
  try {
    const stockData = await stock.scrapeStock(ticker);
    console.log(stockData);
    res.send(stockData);
  } catch (err) {
    console.error(err);
    res.status(404).send(`Could not retrieve realtime data for ${ticker} - ${err.message}`);
  }
});

//GET : realtime financials on specific stock
router.get("/financials/:id", async (req, res) => {
  const ticker = req.params.id;

  try {
    const urlBalanceSheet = `https://finance.yahoo.com/quote/${ticker}/balance-sheet?p=${ticker}`;
    const urlCashFlow = `https://finance.yahoo.com/quote/${ticker}/cash-flow?p=${ticker}`;
    const urlIncomeStatement = `https://finance.yahoo.com/quote/${ticker}/financials?p=${ticker}`;

    const balanceSheet = await scrapeBalanceSheet(urlBalanceSheet);
    const cashFlow = await scrapeCashFlow(urlCashFlow);
    const incomeStatement = await scrapeIncomeStatement(urlIncomeStatement);

    const statements = { balanceSheet, cashFlow, incomeStatement };
    res.send(statements);
  
  } catch (err) {
    console.log(err);
    res.status(400).send(`Encountered error while trying to retrieve realtime financials for ${ticker} - ${err.message}`);
  }
});

module.exports = router;
