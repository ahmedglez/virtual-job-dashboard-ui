import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import rootReducer from "reducers/root.reducer";
import { Provider } from "react-redux";
import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import { logger } from "middlewares/redux";
import { jwtMiddleware, refreshTokenMiddleware } from "../src/middlewares/redux-thunk";
// Vision UI Dashboard React Context Provider
import { VisionUIControllerProvider } from "context";

const composedEnhancer = compose(applyMiddleware(logger, jwtMiddleware, refreshTokenMiddleware));

const store = createStore(rootReducer, composedEnhancer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <VisionUIControllerProvider>
        <App />
      </VisionUIControllerProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
