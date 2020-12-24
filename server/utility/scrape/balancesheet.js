const puppeteer = require("puppeteer");

const scrapeBalanceSheet = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url);

  //Balance Sheet
  const yearBalanceSheet =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[1]/div/div[2]/span';
  const totalAssets =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/span';
  const totalLiabilities =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[2]/div[1]/div[2]/span';
  const totalDebt =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[11]/div[1]/div[2]/span';
  const tangibleBookValue =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[10]/div[1]/div[2]/span';
  const investedCapital =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[9]/div[1]/div[2]/span';

  const balanceSheet = [];
  const balanceSheetSelectors = {
    yearBalanceSheet,
    totalAssets,
    totalLiabilities,
    totalDebt,
    tangibleBookValue,
    investedCapital,
  };
  console.log("BalanceSheet Selectors");
  for (let selector in balanceSheetSelectors) {
    const [ element ] = await page.$x(balanceSheetSelectors[selector]);
    const rawData = await element.getProperty("textContent");
    const data = await rawData.jsonValue();
    let temp = {};
    temp[selector] = data;
    balanceSheet.push(temp);
  }

  browser.close();
  return balanceSheet;
};

module.exports = scrapeBalanceSheet;
