const express = require("express");
const app = express();

const portfolio = require("./routes/portfolio");

//DATABASE
require("./db")();

//ROUTES
app.use(express.json());
app.use("/api/portfolio", portfolio);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
