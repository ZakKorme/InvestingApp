export const getDailyPrice = (obj) => {
  const stockData = obj["Time Series (Daily)"];
  if (!stockData) return new Error("API sucks");

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day =
    currentDate.getDate() < 10
      ? "0" + currentDate.getDate()
      : currentDate.getDate();
  const formattedDate = `${year}-${month}-${day}`;

  if (stockData[formattedDate] && stockData[formattedDate]["4. close"])
    return stockData[formattedDate]["4. close"];
  
  for (let i = 1; i < 3; i++) {
    const [tempYear, tempMonth, tempDate] = subtractDate(currentDate);
    const stockDataDay = stockData[`${tempYear}-${tempMonth}-${tempDate}`];
    if (stockDataDay && stockDataDay["4. close"]) {
      return stockDataDay["4. close"];
    }
  }
};

export const subtractDate = (date,) => {
  date.setDate(date.getDate() - 1);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return [year, month, day];
};
