const validatePorfolio = (row, ticker) => {
  const stocks = [];
  for (let obj in row) {
    if (row[obj]["ticker"]) {
      stocks.push(row[obj]["ticker"]);
    }
  }
  return stocks.includes(ticker);
};

export default validatePorfolio;
