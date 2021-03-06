const express = require("express");
const router = express.Router();
const cors = require("cors");

const stock = require("../utility/scrape/stock");

const { Watchlist, validateWatchlist } = require("../models/watchlist");

//GET: Get watchlist
router.get("/", async (req, res) => {
  console.log("Getting watchlist");

  try {
    const watchlist = await Watchlist.find();
    res.send(watchlist);
  } catch (e) {
    console.log(
      "Encountered the following error while trying to get currentPrice:"
    );
    console.error(e);
    res.status(404).send({ error: e });
  }
});

//GET: Get watchlist current prices
router.get("/currentPrice", async (req, res) => {
  console.log("Getting watchlist current price");
  const watchlists = await Watchlist.find({}, { ticker: 1, _id: 0 });
  if (!watchlists) return res.status(404).send("The stock is not in the database.");

  const tickers = watchlists.map(({ ticker }) => ticker);
  const stockCurrentPrices = await stock.scrapeStocks(tickers);

  try {
    for (let [ticker, currentPrice] of Object.entries(stockCurrentPrices)) {
      await Watchlist.findOneAndUpdate(
        { ticker: ticker },
        { currentPrice: currentPrice }
      );
    }
    const watchlist = await Watchlist.find();
    res.send(watchlist);
  
  } catch (e) {
    console.log(
      "Encountered the following error while trying to get currentPrice:"
    );
    console.error(e);
    res.status(404).send({ error: e });
  }
});

//GET: Get watchlist
router.get("/:id", async (req, res) => {
  const ticker = req.params.id.toUpperCase();
  const watchlist = await Watchlist.findOne({ ticker: ticker });
  if (!watchlist)
    return res.status(404).send("The stock is not in the database");
  res.send(watchlist);
});

//POST: Add stock to watchlist
router.post("/", async (req, res) => {
  const { error } = validateWatchlist(req.body);
  console.log(req.body);

  if (error) return res.status(404).send(error);

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fullDate = `${year}-${month}-${day}`;

  const { ticker, companyName, priceAdded, currentPrice, targetPrice } = req.body;
  let watchlist = new Watchlist({
    ticker,
    companyName,
    dateAdded: fullDate,
    priceAdded,
    currentPrice,
    targetPrice,
  });
  
  try {
    watchlist = await watchlist.save();
    res.send(watchlist);
  } catch (err) {
    console.log("Couldn't upload to Database");
  }
});

//PUT : Update a stock
router.put("/:id", cors(), async (req, res) => {
  const watchlist = await Watchlist.findOneAndUpdate(
    { ticker: req.params.id },
    { targetPrice: req.body.targetPrice }
  );

  if (!watchlist)
    return res.status(404).send("This stock does not exist in the watchlist");
  res.send(watchlist);
});

//DELETE: delete a stock from watchlist
router.delete("/:id", async (req, res) => {
  let watchlist = await Watchlist.findOneAndDelete({ ticker: req.params.id });
  if (!watchlist) return res.status(404).send("Stock Not In Portfolio");

  watchlist = await Watchlist.find();
  res.send(watchlist);
});

module.exports = router;
