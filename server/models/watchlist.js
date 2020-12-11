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
  currentPrice: {
    type: Number,
    required: true,
    min: 0,
    max: 1000000,
  },
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

const validateWatchlist = (watchlistTicker) => {
  const schema = Joi.object({
    ticker: Joi.string().uppercase().min(1).max(4).required(),
    currentPrice: Joi.number().min(0).max(1000000).required(),
  });
  return schema.validate(watchlistTicker);
};

exports.Watchlist = Watchlist;
exports.validateWatchlist = validateWatchlist;
