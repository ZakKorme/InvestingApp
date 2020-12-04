const puppeteer = require("puppeteer");

const scrapeIncomeStatement = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url);

  //IncomeStatement
  const incomeStatement = [];
  let yearIncomeStatement =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[1]/div/div[2]/span';
  let totalRevenue =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/span';
  let grossProfit =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[3]/div[1]/div[2]/span';

  let operatingExpense =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[4]/div[1]/div[2]/span';
  let operatingIncome =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[5]/div[1]/div[2]/span';
  let preTaxIncome =
    '//*[@id="Col1-1-Financials-Proxy"]/section/div[4]/div[1]/div[1]/div[2]/div[8]/div[1]/div[2]/span';
  let incomeStatementSelectors = {
    yearIncomeStatement,
    totalRevenue,
    grossProfit,
    operatingExpense,
    operatingIncome,
    preTaxIncome,
  };
  console.log("IncomeStatement Selectors");
  for (let selector in incomeStatementSelectors) {
    const [element] = await page.$x(incomeStatementSelectors[selector]);
    const rawData = await element.getProperty("textContent");
    const data = await rawData.jsonValue();
    let temp = {};
    temp[selector] = data;
    incomeStatement.push(temp);
  }

  browser.close();
  return incomeStatement;
};

module.exports = scrapeIncomeStatement;
