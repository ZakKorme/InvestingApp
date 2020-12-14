const express = require("express");
const router = express.Router();

const stock = require("../utility/scrape/stock");

const { Watchlist, validateWatchlist } = require("../models/watchlist");

//GET: Get watchlist
router.get("/", async (req, res) => {
  console.log("running get watchlist");

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
  console.log("running get watchlist current price");
  const watchlists = await Watchlist.find({}, { ticker: 1, _id: 0 });
  if (!watchlists)
    return res.status(404).send("The stock is not in the database. you suck");

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

  if (error)
    return res
      .status(404)
      .send("There was an error: Ticker isnt in the correct format");

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fullDate = `${year}-${month}-${day}`;

  let watchlist = new Watchlist({
    ticker: req.body.ticker,
    companyName: req.body.companyName,
    dateAdded: fullDate,
    priceAdded: req.body.priceAdded,
    currentPrice: req.body.currentPrice,
    targetPrice: req.body.targetPrice,
  });
  try {
    watchlist = await watchlist.save();
    res.send(watchlist);
  } catch (err) {
    console.log("Couldn't upload to Database");
  }
});

module.exports = router;
