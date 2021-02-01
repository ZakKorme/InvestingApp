# InvestingApp

The following application provides a centralized location for investors to track and access their positions. Users can track stock prices, look up financial documents, and follow their returns. 

## How to run

```
cd server
npm start

cd ../client/app
npm start
```
## Motivation
The motivation for this app was to create a platform that made it possible for investors to follow a value-centered approach. This method begins by reviewing financial documents and business fundamentals. Afterward, if the business has a good foundation, we view the price and make sure we don't overpay for the asset.

This app was developed to remove the conventional messaging attached to most investing apps today. Most apps encourage regular trading irrespective of price and value. This platform hopefully reminds the investor that strict analysis and patience are the best traits an aspiring investor can have.  


## Screenshots

#### Home

![Screen Shot 2021-01-31 at 7 33 44 PM](https://user-images.githubusercontent.com/38298940/106403178-488be180-63fb-11eb-874b-f3df1e234f9c.png)

#### Scan 

![Screen Shot 2021-01-31 at 5 24 07 PM](https://user-images.githubusercontent.com/38298940/106401135-7586c700-63f0-11eb-9111-c4c100aafb81.png)

#### Analysis

![Screen Shot 2021-01-31 at 5 23 27 PM](https://user-images.githubusercontent.com/38298940/106401186-c4346100-63f0-11eb-83eb-ab4df02ba647.png)

#### Portfolio

![Screen Shot 2021-01-31 at 5 24 18 PM](https://user-images.githubusercontent.com/38298940/106401156-9818e000-63f0-11eb-9ba4-593a16201320.png)
![Screen Shot 2021-01-31 at 5 24 50 PM](https://user-images.githubusercontent.com/38298940/106401463-39546600-63f2-11eb-9662-66eb57194324.png)



## Tech/framework used
 - React/Redux
 - NodeJS
 - Express
 - Puppeteer

## Features

  - **Price and MarketCap**: scan feature allows the user to look up fundamental aspects of a company with only the ticker symbol
  - **Financial Documents (Balance Sheet, Income Statement, Statements of Cash Flow)**: after the scan of the stock is complete the user can request all  financial documents
  - **Portfolio Tracker**: this feature will track all the stocks within the portfolio and update prices
  - **Current Price**: all stocks within the portfolio will have their prices updated every 2 minutes while the stock market is open
  

## Problems?

Make sure you are running mongodb. If not, go to the project's root directory
and create a database folder:

```
mkdir -p data
mkdir -p data/db
```

Then start mongo:
`mongod --dbpath data/db`

If you would like to run mongo in the background as a daemon, run the following:
`mongod --dbpath data/db &`



