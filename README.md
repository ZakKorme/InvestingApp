# InvestingApp

## How to run

```
cd server
npm start

cd ../client/app
npm start
```

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


### TODO LIST
[X] Portfolio Page: Add/Remove Functionality with Watchlist 

[X] Portfolio Page: Add/Remove Functionality with Portfolio

[] Portfolio Page: Align Watchlist and Portfolio Titles

[] Home Page: Add Jumbotron w/Daily Reminders

[] Scan Page: Move the Scan input field

[] Analysis Page: Connect to EDGAR and return 5 years worth of 10k 

[] Analysis Page: color-code the price change
