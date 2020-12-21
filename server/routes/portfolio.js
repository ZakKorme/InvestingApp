const express = require("express");
const router = express.Router();
const { Portfolio, validatePortfolio } = require("../models/portfolio");

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
  if (error) return res.status(404).send("There was an issue in validation");
  //Add Stock
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fullDate = `${year}-${month}-${day}`;

  let portfolio = new Portfolio({
    tickerSymbol: req.body.tickerSymbol,
    companyName: req.body.companyName,
    purchasedPrice: req.body.purchasedPrice,
    currentPrice: req.body.currentPrice,
    purchasedDate: fullDate,
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
  let portfolio = await Portfolio.findOneAndDelete({
    tickerSymbol: req.params.id,
  });
  if (!portfolio) return res.status(404).send("Stock Not In Portfolio");

  portfolio = await Portfolio.find();
  res.send(portfolio);
});

module.exports = router;
