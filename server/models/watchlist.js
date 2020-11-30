const mongoose = require("mongoose");
const Joi = require("joi");

const watchlistSchema = new mongoose.Schema({
  ticker: {
    type: String,
    minLength: 1,
    maxLength: 4,
    required: true,
  },
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

const validateWatchlist = (watchlistTicker) => {
  const schema = Joi.object({
    ticker: Joi.string().uppercase().min(1).max(4).required(),
  });
  return schema.validate(watchlistTicker);
};

exports.Watchlist = Watchlist;
exports.validateWatchlist = validateWatchlist;
