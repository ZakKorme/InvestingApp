const mongoose = require("mongoose");
const Joi = require("joi");
const { number } = require("joi");

const watchlistSchema = new mongoose.Schema({
  ticker: {
    type: String,
    minLength: 1,
    maxLength: 4,
    required: true,
  },
  companyName: {
    type: String,
    minLength: 1,
    maxLength: 256,
    required: true,
  },
  dateAdded: {
    type: Date,
    required: true,
  },
  priceAdded: {
    type: Number,
    required: true,
    min: 0,
    max: 1000000,
  },
  currentPrice: {
    type: Number,
    required: true,
    min: 0,
    max: 1000000,
  },
  targetPrice: {
    type: Number,
    required: false,
    min: 0,
    max: 1000000,
  },
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

const validateWatchlist = (watchlistTicker) => {
  const schema = Joi.object({
    ticker: Joi.string().uppercase().min(1).max(4).required(),
    companyName: Joi.string().min(1).max(256).required(),
    dateAdded: Joi.date().required(),
    priceAdded: Joi.number().min(1).max(256).required(),
    currentPrice: Joi.number().min(0).max(1000000).required(),
    targetPrice: Joi.number().min(0).max(10000),
  });
  return schema.validate(watchlistTicker);
};

exports.Watchlist = Watchlist;
exports.validateWatchlist = validateWatchlist;
