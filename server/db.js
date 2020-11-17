const mongoose = require("mongoose");
const db = "mongodb://localhost/investingApp";

module.exports = function () {
  mongoose
    .connect(db)
    .then(() => {
      console.log("Connected: investingApp Database");
    })
    .catch((err) => {
      console.error(err);
    });
};
