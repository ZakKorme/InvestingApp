import { useEffect } from "react";

import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { initPortfolio } from "./store/actions/portfolio";
import { initWatchlist, autoUpdateWatchlist } from "./store/actions/watchlist";
import Navigation from "./components/Navigation/Navigation";
import Home from "./containers/Home/Home";
import Scan from "./containers/Scan/Scan";
import Analysis from "./containers/Analysis/Analysis";
import Portfolio from "./containers/Portfolio/Portfolio";

function App(props) {
  const { initPortfolio, initWatchlist, autoUpdateWatchlist } = props;

  useEffect(() => {
    initPortfolio();
    initWatchlist();
  }, [initPortfolio, initWatchlist]);

  const autoUpdateInterval = setInterval(() => {
    const currentTime = new Date();

    const timezoneOffset = currentTime.toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    const timeSplit = timezoneOffset.split(" ");
    const easternHour = Number(timeSplit[1].split(":")[0]);
    const amOrPm = timeSplit[2];

    if (
      currentTime.getUTCDay() > 5 ||
      (easternHour > 4 && amOrPm === "PM") ||
      (easternHour < 9 && amOrPm === "AM")
    ) {
      clearInterval(autoUpdateInterval);
      console.log("Market is not currently open.");
      return;
    }
    autoUpdateWatchlist(autoUpdateInterval);
  }, 120 * 1000); // 2 mins

  let routes = (
    <Switch>
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/analysis" component={Analysis} />
      <Route path="/scan" component={Scan} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="App">
      <Navigation />
      {routes}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    initPortfolio: () => dispatch(initPortfolio()),
    initWatchlist: () => dispatch(initWatchlist()),
    autoUpdateWatchlist: () => dispatch(autoUpdateWatchlist()),
  };
};

export default connect(null, mapDispatchToProps)(App);
