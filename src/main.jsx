import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AuthSessionProvider } from "./app/providers";
import { Provider as ReduxStoreProvider } from "react-redux";
import { store } from "./app/store/redux";

import "./styles/reset.css";
import "./styles/build.css";
import "./global.scss";
import "./index.css";
import "animate.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReduxStoreProvider store={store}>
    <AuthSessionProvider>
      <App />
    </AuthSessionProvider>
  </ReduxStoreProvider>
);
