const express = require("express");
const app = express();

const portfolio = require("./routes/portfolio");

//ROUTES
app.use("/api/portfolio", portfolio);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
