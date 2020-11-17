const express = require("express");
const router = express.Router();
const { Portfolio, validatePortfolio } = require("../models/portfolio");

//GET : Entire Portfolio
router.get("/", (req, res) => {
  res.send("This will return the portfolio");
});

//GET : Specific Stock
router.get("/:id", (req, res) => {
  res.send("This will get a specific stock");
});

//POST : Add stock to portfolio
router.post("/", (req, res) => {
  res.send("This will add a stock to the portfolio");
});

//PUT : Update a stock
router.put("/:id", (req, res) => {
  res.send("This will update a stock");
});
//DELETE : Delete a stock
router.delete("/:id", (req, res) => {
  res.send("This will delete a stock");
});

module.exports = router;
