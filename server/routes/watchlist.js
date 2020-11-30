const express = require("express");
const router = express.Router();

const { Watchlist, validateWatchlist } = require("../models/watchlist");

//GET: Get watchlist
router.get("/", async (req, res) => {
  const watchlist = await Watchlist.find();
  res.send(watchlist);
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

  let watchlist = new Watchlist({
    ticker: req.body.ticker,
  });
  try {
    watchlist = await watchlist.save();
    res.send(watchlist);
  } catch (err) {
    console.log("Couldn't upload to Database");
  }
});

module.exports = router;
