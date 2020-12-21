const mongoose = require("mongoose");
const Joi = require("joi");


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
    maxLength: 1000,
    required: true,
  },
  dateAdded: {
    type: String,
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
    companyName: Joi.string().min(1).max(1000).required(),
    priceAdded: Joi.number().min(0).max(1000000).required(),
    currentPrice: Joi.number().min(0).max(1000000).required(),
    targetPrice: Joi.number().min(0).max(1000000),
  });
  return schema.validate(watchlistTicker);
};

exports.Watchlist = Watchlist;
exports.validateWatchlist = validateWatchlist;
