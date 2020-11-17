import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import BrowserRouter from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import portfolioReducer from "./store/reducers/portfolio";
import scannerReducer from "./store/reducers/scanner";

const rootReducer = combineReducers({
  portfolio: portfolioReducer,
  scanner: scannerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
