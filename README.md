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
