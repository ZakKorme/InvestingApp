const puppeteer = require("puppeteer");

const scrapeStock = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  //Price
  const [el] = await page.$x(
    '//*[@id="quote-header-info"]/div[3]/div[1]/div/span[1]'
  );
  const rawPrice = await el.getProperty("textContent");
  const price = await rawPrice.jsonValue();

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

  browser.close();
  return { price, marketCap, range52Week };
};

module.exports = scrapeStock;
