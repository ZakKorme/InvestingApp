const getCurrentPrice = (prevRows, updatedRows) => {
  const newRows = prevRows;
  for (let i = 0; i < prevRows.length; i++) {
    if (!updatedRows[i]) continue;
    
    const currentPrice = updatedRows[i]["currentPrice"];
    const priceAdded = updatedRows[i]["priceAdded"];
    newRows[i]["currentPrice"] = updatedRows[i]["currentPrice"];
    newRows[i]["priceChange"] = `${(
      ((currentPrice - priceAdded) / priceAdded) *
      100
    ).toFixed(2)} %`;
  }
  return newRows;
};

export default getCurrentPrice;
