const puppeteer = require("puppeteer");

const scrapeCashFlow = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url);

  //Cashflow
  const cashFlow = [];
  let yearCashFlow =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[1]/div/div[2]/span';
  let operatingCashFlow =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/span';
  let investingCashFlow =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[2]/div[1]/div[2]/span';
  // let financingCashFlow =
  //   '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[3]/div[1]/div[2]/span';
  let endCashPosition =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[4]/div[1]/div[2]/span';
  // let freeCashFlow =
  //   '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[11]/div[1]/div[2]/span';

  const cashFlowSelectors = {
    yearCashFlow: yearCashFlow,
    operatingCashFlow: operatingCashFlow,
    investingCashFlow: investingCashFlow,
    // financingCashFlow: financingCashFlow,
    endCashPosition: endCashPosition,
    // freeCashFlow: freeCashFlow,
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
