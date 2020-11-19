const express = require("express");
const app = express();

const portfolio = require("./routes/portfolio");
const scraping = require("./routes/scraping");

//DATABASE
require("./db")();

//ROUTES
app.use(express.json());
app.use("/api/portfolio", portfolio);
app.use("/api/scrape/", scraping);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
