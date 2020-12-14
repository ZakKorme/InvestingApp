const getCurrentPrice = (prevRows, updatedRows) => {
  const newRows = prevRows;
  for (let i = 0; i < prevRows.length; i++) {
    let currentPrice = updatedRows[i]["currentPrice"];
    let priceAdded = updatedRows[i]["priceAdded"];
    newRows[i]["currentPrice"] = updatedRows[i]["currentPrice"];
    newRows[i]["priceChange"] = `${(
      ((currentPrice - priceAdded) / priceAdded) *
      100
    ).toFixed(2)} %`;
  }
  return newRows;
};

export default getCurrentPrice;
