const puppeteer = require("puppeteer");

const getStockPrice = async (page, url) => {
  await page.goto(url);

  //Price
  const [el] = await page.$x(
    '//*[@id="quote-header-info"]/div[3]/div[1]/div/span[1]'
  );
  const rawPrice = await el.getProperty("textContent");
  const price = await rawPrice.jsonValue();
  return price;
}

const scrapeStocks = async (tickers) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  let stockCurrentPrices = {};
  let i = 0;
  while (i < tickers.length) {
    const ticker = tickers[i];
    const url = `https://finance.yahoo.com/quote/${ticker}?p=${ticker}`;
    const price = await getStockPrice(page, url);
    stockCurrentPrices[ticker] = price;
    i += 1;
  }

  return stockCurrentPrices;
}

const scrapeStock = async (ticker, priceOnly = false) => {
  const url = `https://finance.yahoo.com/quote/${ticker}?p=${ticker}`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  // Price
  const price = await getStockPrice(page, url);

  //Market Cap
  const [el2] = await page.$x(
    '//*[@id="quote-summary"]/div[2]/table/tbody/tr[1]/td[2]/span'
  );
  const rawMarketCap = await el2.getProperty("textContent");
  const marketCap = await rawMarketCap.jsonValue();

  //52-Week Range
  const [el3] = await page.$x(
    '//*[@id="quote-summary"]/div[1]/table/tbody/tr[6]/td[2]'
  );
  const raw52WeekRange = await el3.getProperty("textContent");
  const range52Week = await raw52WeekRange.jsonValue();

  //Volume
  const [el4] = await page.$x(
    '//*[@id="quote-summary"]/div[1]/table/tbody/tr[7]/td[2]/span'
  );
  const rawVolume = await el4.getProperty("textContent");
  const volume = await rawVolume.jsonValue();
  //P/E
  const [el5] = await page.$x(
    '//*[@id="quote-summary"]/div[2]/table/tbody/tr[3]/td[2]/span'
  );
  const rawPE = await el5.getProperty("textContent");
  const pe = await rawPE.jsonValue();

  browser.close();
  return { price, marketCap, range52Week, volume, pe };
};

exports.scrapeStock = scrapeStock;
exports.scrapeStocks = scrapeStocks;
