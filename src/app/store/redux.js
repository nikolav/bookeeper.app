import { configureStore } from "@reduxjs/toolkit";
import appDataReducer from "./slice-appdata";
import flagsReducer from "./slice-flags";
import authReducer from "./slice-auth";
//
export const store = configureStore({
  reducer: {
    auth: authReducer,
    appdata: appDataReducer,
    flags: flagsReducer,
  },
});
