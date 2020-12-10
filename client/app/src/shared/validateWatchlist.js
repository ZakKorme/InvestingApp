const validateWatchlist = (rows, ticker) => {
    const stocks = [];
    for (let obj in rows) {
        if (rows[obj]["ticker"]) {
            stocks.push(rows[obj]["ticker"]);
        }
    }
    return stocks.includes(ticker);
};

export default validateWatchlist;