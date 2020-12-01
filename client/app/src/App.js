import { useEffect } from "react";

import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { initPortfolio } from "./store/actions/portfolio";
import { initWatchlist } from "./store/actions/watchlist";
import Navigation from "./components/Navigation/Navigation";
import Home from "./containers/Home/Home";
import Scan from "./containers/Scan/Scan";
import Analysis from "./containers/Analysis/Analysis";
import Portfolio from "./containers/Portfolio/Portfolio";

function App(props) {
  const { initPortfolio, initWatchlist } = props;

  useEffect(() => {
    initPortfolio();
    initWatchlist();
  }, [initPortfolio, initWatchlist]);

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
  };
};

export default connect(null, mapDispatchToProps)(App);
