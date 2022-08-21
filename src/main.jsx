import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { Provider as ReduxStoreProvider } from "react-redux";
import { store } from "./app/store/redux";

import "./styles/reset.css";
import "./styles/build.css";
import "./global.scss";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ReduxStoreProvider store={store}>
      <App />
    </ReduxStoreProvider>
  </BrowserRouter>
);
