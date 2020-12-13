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
    if (currentTime.getDate() > 5 || (currentTime.getHours() < 14 || currentTime.getHours() > 20)) {
      clearInterval(autoUpdateInterval);
      console.log("Market is not currently open.");
      return;
    }
    autoUpdateWatchlist(autoUpdateInterval);
  }, 2 * 60 * 1000); // 2 mins

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
