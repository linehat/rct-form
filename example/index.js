import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { createStore, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";

// AppContainer 是一个 HMR 必须的包裹(wrapper)组件

import App from "./app";

// redux configure
// reducer

const store = createStore(
  combineReducers({ form: formReducer }),
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById("app")
  );
};

render(App);

// 模块热替换的 API
if (module.hot) {
  console.log("fkasjdlajsdask");
  module.hot.accept("./app", () => {
    render(App);
  });
}
