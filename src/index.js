import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import rootReducer from "reducers/root.reducer";
import { Provider } from "react-redux";
import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";

// Vision UI Dashboard React Context Provider
import { VisionUIControllerProvider } from "context";

const store = createStore(rootReducer);

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
