const express = require("express");
const router = express.Router();
const { Portfolio, validatePortfolio } = require("../models/portfolio");
const { raw } = require("express");

//GET : Entire Portfolio
router.get("/", async (req, res) => {
  const portfolio = await Portfolio.find();
  res.send(portfolio);
});

//GET : Specific Stock
router.get("/:id", async (req, res) => {
  const ticker = req.params.id.toUpperCase();
  const portfolio = await Portfolio.findOne({ tickerSymbol: ticker });
  if (!portfolio) return res.status(404).send("Stock Not In Portfolio");
  res.send(portfolio);
});

//POST : Add stock to portfolio
router.post("/", async (req, res) => {
  //Validation
  const { error } = validatePortfolio(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  //Add Stock
  let portfolio = new Portfolio({
    tickerSymbol: req.body.tickerSymbol,
    purchasedPrice: req.body.purchasedPrice,
    purchasedDate: req.body.purchasedDate,
    numberOfShares: req.body.numberOfShares,
  });
  try {
    portfolio = await portfolio.save();
    res.send(portfolio);
  } catch (err) {
    console.log(err);
  }
});

//PUT : Update a stock
router.put("/:id", async (req, res) => {
  // Validate
  const { error } = validatePortfolio(req.body);
  if (error) return res.status(404).send("Incorrect Format");
  // Update Portfolio
  const portfolio = await Portfolio.findOneAndUpdate(
    { tickerSymbol: req.params.id },
    {
      tickerSymbol: req.body.tickerSymbol,
      purchasedPrice: req.body.purchasedPrice,
      purchasedDate: req.body.purchasedDate,
      numberOfShares: req.body.numberOfShares,
    }
  );

  if (!portfolio) return res.status(404).send("Stock Not In Portfolio");
  res.send(portfolio);
});
//DELETE : Delete a stock
router.delete("/:id", async (req, res) => {
  const portfolio = await Portfolio.findOneAndDelete({
    tickerSymbol: req.params.id,
  });
  if (!portfolio) return res.status(404).send("Stock Not In Portfolio");
  res.send(portfolio);
});

module.exports = router;
