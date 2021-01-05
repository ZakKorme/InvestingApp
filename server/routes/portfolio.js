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
  if (!portfolio) return res.status(404).send("Could not find Stock in Portfolio");
  res.send(portfolio);
});

//POST : Add stock to portfolio
router.post("/", async (req, res) => {
  //Validation
  const { error } = validatePortfolio(req.body);
  if (error) return res.status(404).send(`Validation error - ${error.message}`);
  
  //Add Stock
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fullDate = `${year}-${month}-${day}`;

  const { tickerSymbol, companyName, purchasedPrice, currentPrice, numberOfShares } = req.body;

  let portfolio = new Portfolio({
    tickerSymbol,
    companyName,
    purchasedPrice,
    currentPrice,
    purchasedDate: fullDate,
    numberOfShares,
  });

  try {
    portfolio = await portfolio.save();
    res.send(portfolio);
  } catch (err) {
    console.log(err);
    res.status(400).send(`Could not add stock to portfolio - ${err.message}`);
  }
});

//PUT : Update a stock
router.put("/:id", async (req, res) => {
  // Validation
  const { error } = validatePortfolio(req.body);
  if (error) return res.status(404).send(`Validation error - ${error.message}`);
  
  // Update Portfolio
  const { tickerSymbol, purchasedPrice, purchasedDate, numberOfShares } = req.body;
  const portfolio = await Portfolio.findOneAndUpdate(
    { tickerSymbol: req.params.id },
    { tickerSymbol, purchasedPrice, purchasedDate, numberOfShares }
  );

  if (!portfolio) return res.status(404).send("Could not find Stock in Portfolio");
  res.send(portfolio);
});

//DELETE : Delete a stock
router.delete("/:id", async (req, res) => {
  let portfolio = await Portfolio.findOneAndDelete({
    tickerSymbol: req.params.id,
  });
  if (!portfolio) return res.status(404).send("Could not find Stock in Portfolio");

  portfolio = await Portfolio.find();
  res.send(portfolio);
});

module.exports = router;
