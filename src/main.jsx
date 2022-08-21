import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxStoreProvider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";

//
import {
  AppEventsProvider,
  AuthSessionProvider,
  GravatarsProvider,
  MuiThemeProvider,
} from "./app/providers";
import { store } from "./app/store/redux";

//
import App from "./App";

//
import "./styles/reset.css";
import "./styles/build.css";
import "./global.scss";
import "./index.css";
import "animate.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppEventsProvider>
    <ReduxStoreProvider store={store}>
      <AuthSessionProvider>
        <MuiThemeProvider>
          <CssBaseline />
          <GravatarsProvider>
            <App />
          </GravatarsProvider>
        </MuiThemeProvider>
      </AuthSessionProvider>
    </ReduxStoreProvider>
  </AppEventsProvider>
);
