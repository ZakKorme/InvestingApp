const express = require("express");
const app = express();
const cors = require("cors");

const portfolio = require("./routes/portfolio");
const scraping = require("./routes/scraping");
const watchlist = require("./routes/watchlist");

//DATABASE
require("./db")();

//ROUTES
app.use(cors());
app.use(express.json());
app.use("/api/portfolio", portfolio);
app.use("/api/scrape", scraping);
app.use("/api/watchlist", watchlist);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
