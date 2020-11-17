const mongoose = require("mongoose");
const db = "mongodb://localhost/investingApp";

module.exports = function () {
  mongoose
    .connect(db, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected: investingApp Database");
    })
    .catch((err) => {
      console.error(err);
    });
};
