const mongoose = require("mongoose");
const Joi = require("joi");

const portfolioSchema = new mongoose.Schema({
  tickerSymbol: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxLength: 4,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxLength: 256
  },
  purchasedPrice: {
    type: Number,
    required: true,
    min: 0,
    max: 1000000,
  },
  currentPrice: {
    type: Number,
    required: true,
    min: 0,
    max: 10000
  },
  purchasedDate: {
    type: String,
    required: true
  },
  numberOfShares: {
    type: Number,
    required: true,
    min: 0,
    max: 1000000,
  },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

const validatePortfolio = (stockEntry) => {
  const schema = Joi.object({
    tickerSymbol: Joi.string().uppercase().min(1).max(4).required(),
    companyName: Joi.sdtring().min(1).max(256).required(),
    purchasedPrice: Joi.number().min(0).max(1000000).required(),
    purchasedDate: Joi.string().greater("9-28-1987").required(),
    numberOfShares: Joi.number().min(0).max(1000000).required(),
  });
  return schema.validate(stockEntry);
};

exports.Portfolio = Portfolio;
exports.validatePortfolio = validatePortfolio;
