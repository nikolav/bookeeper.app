import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxStoreProvider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";

//
import {
  AppEventsProvider,
  AuthSessionProvider,
  GravatarsProvider,
  JqueryProvider,
  MuiThemeProvider,
  QueryProvider,
  ResourceMainProvider,
} from "./app/providers";
import { store } from "./app/store/redux";

//
import App from "./App";

//
import "./styles/reset.css";
import "./styles/build.css";
import "./global.scss";
import "./index.css";
import "@fancyapps/ui/dist/fancybox.css";
import "animate.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppEventsProvider>
    <ReduxStoreProvider store={store}>
      <QueryProvider>
        <ResourceMainProvider>
          <AuthSessionProvider>
            <MuiThemeProvider>
              <CssBaseline />
              <GravatarsProvider>
                <JqueryProvider>
                  <App />
                </JqueryProvider>
              </GravatarsProvider>
            </MuiThemeProvider>
          </AuthSessionProvider>
        </ResourceMainProvider>
      </QueryProvider>
    </ReduxStoreProvider>
  </AppEventsProvider>
);
