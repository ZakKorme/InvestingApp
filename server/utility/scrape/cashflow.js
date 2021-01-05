const puppeteer = require("puppeteer");

const scrapeCashFlow = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url);

  //Cashflow
  const cashFlow = [];
  const yearCashFlow =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[1]/div/div[2]/span';
  const operatingCashFlow =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/span';
  const investingCashFlow =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[2]/div[1]/div[2]/span';
  const endCashPosition =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[4]/div[1]/div[2]/span';

  const cashFlowSelectors = {
    yearCashFlow,
    operatingCashFlow,
    investingCashFlow,
    endCashPosition,
  };
  console.log("CashFlow Selectors");
  for (let selector in cashFlowSelectors) {
    const [element] = await page.$x(cashFlowSelectors[selector]);
    const rawData = await element.getProperty("textContent");
    const data = await rawData.jsonValue();
    let temp = {};
    temp[selector] = data;
    cashFlow.push(temp);
  }

  browser.close();
  return cashFlow;
};

module.exports = scrapeCashFlow;
