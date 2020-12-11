const validatePorfolio = (row, ticker) => {
  const stocks = [];
  for (let obj in row) {
    console.log(row[obj]);
    if (row[obj]["ticker"]) {
      stocks.push(row[obj]["ticker"]);
    }
  }
  console.log(stocks);
  return stocks.includes(ticker);
};

export default validatePorfolio;
