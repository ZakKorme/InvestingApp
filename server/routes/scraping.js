const express = require("express");
const router = express.Router();
const scrapeStock = require("../utility/scrape.js");

//GET : realtime data on specific stock
router.get("/:id", async (req, res) => {
  let stockData = null;
  try {
    const ticker = req.params.id;
    let url = `https://finance.yahoo.com/quote/${ticker}?p=${ticker}`;
    stockData = await scrapeStock(url);
  } catch (err) {
    console.error(err);
  }
  res.send(stockData);
});

module.exports = router;
