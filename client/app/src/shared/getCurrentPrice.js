const getCurrentPrice = (prevRows, updatedRows) => {
  for (let i = 0; i < prevRows.length; i++) {
    prevRows[i]["currentPrice"] = updatedRows[i]["currentPrice"];
  }
  return prevRows;
};

export default getCurrentPrice;
