export const getDailyPrice = (obj) => {
  const stockData = obj["Time Series (Daily)"];
  if (!stockData) return new Error("API sucks");
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day =
    currentDate.getDate() < 10
      ? "0" + currentDate.getDate()
      : currentDate.getDate();
  let formattedDate = `${year}-${month}-${day}`;

  if (stockData[formattedDate]["4. close"]) {
    return stockData[formattedDate]["4. close"];
  } else {
    for (let i = 1; i < 3; i++) {
      let [tempYear, tempMonth, tempDate] = subtractDate(currentDate, i);
      if (stockData[`${tempYear}-${tempMonth}-${tempDate}`]["4. close"]) {
        return stockData[`${tempYear}-${tempMonth}-${tempDate}`]["4. close"];
      }
    }
  }
};

export const subtractDate = (date, amount) => {
  date.setDate(date.getDate() - amount);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return [year, month, day];
};
