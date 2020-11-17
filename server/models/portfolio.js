const mongoose = require("mongoose");
const Joi = require("joi");

const Portfolio = mongoose.connect(
  "Portfolio",
  new mongoose.Schema({
    tickerSymbol: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxLength: 4,
    },
    purchasedPrice: {
      type: Number,
      required: true,
      min: 0,
      max: 1000000,
    },
    purchasedDate: {
      type: Date,
      min: "1987-09-28",
    },
    numberOfShares: {
      type: Number,
      required: true,
      min: 0,
      max: 1000000,
    },
  })
);

const validatePortfolio = (stockEntry) => {
  const schema = {
    tickerSymbol: Joi.string().min(1).max(4).required(),
    purchasedPrice: Joi.number().min(0).max(1000000).required(),
    purchasedDate: Joi.date().greater("9-28-1987").required(),
    numberOfShares: Joi.number().min(0).max(1000000).required(),
  };
  return Joi.validate(stockEntry, schema);
};

exports.Portfolio = Portfolio;
exports.validatePortfolio = validatePortfolio;
