/// <reference path="./index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { createStore, Store, compose, applyMiddleware, Middleware } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { BrowserRouter } from 'react-router-dom';

import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";
// import MainView from "./containers/MainView/MainView";
import AppRouter from "./components/AppRouter/AppRouter";

import "semantic-ui-css/semantic.min.css";
import "./index.scss";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}

const sagaMiddleware: SagaMiddleware<{}> = createSagaMiddleware();
const middleware: Middleware[] = [sagaMiddleware];
const composeEnhancers = process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store<State.Root> = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

const RootApp = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  </Provider>
);

const HotRootApp = hot(module)(RootApp);

ReactDOM.render(
  <HotRootApp />,
  document.getElementById("root") as HTMLElement
);
