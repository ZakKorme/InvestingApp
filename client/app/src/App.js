import { useEffect } from "react";

import { connect } from "react-redux";
// import { Route } from "react-router-dom";
import { initPortfolio } from "./store/actions/portfolio";
import Home from "./containers/Home/Home";
// import Scan from "./containers/Scan/Scan";
// import Analysis from "./containers/Analysis/Analysis";
// import Portfolio from "./containers/Portfolio/Portfolio";

function App(props) {
  const { initPortfolio } = props;

  useEffect(() => {
    initPortfolio();
  }, [initPortfolio]);

  return (
    <div className="App">
      <Home />
      {/* <Route path="/portfolio" component={Portfolio} />
      <Route path="/analysis" component={Analysis} />
      <Route path="/scan" component={Scan} />
      <Route path="/" exact component={Home} /> */}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    initPortfolio: () => dispatch(initPortfolio()),
  };
};

export default connect(null, mapDispatchToProps)(App);
