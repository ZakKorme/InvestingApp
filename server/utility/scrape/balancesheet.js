const puppeteer = require("puppeteer");

const scrapeBalanceSheet = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url);

  //Balance Sheet
  let yearBalanceSheet =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[1]/div/div[2]/span';
  let totalAssets =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/span';
  let totalLiabilities =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[2]/div[1]/div[2]/span';
  let totalDebt =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[11]/div[1]/div[2]/span';
  let tangibleBookValue =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[10]/div[1]/div[2]/span';
  let investedCapital =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[9]/div[1]/div[2]/span';

  const balanceSheet = [];
  const balanceSheetSelectors = {
    yearBalanceSheet: yearBalanceSheet,
    totalAssets: totalAssets,
    totalLiabilities: totalLiabilities,
    totalDebt: totalDebt,
    tangibleBookValue: tangibleBookValue,
    investedCapital: investedCapital,
  };
  console.log("BalanceSheet Selectors");
  for (let selector in balanceSheetSelectors) {
    const [element] = await page.$x(balanceSheetSelectors[selector]);
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
