import { configureStore } from "@reduxjs/toolkit";
import appDataReducer from "./slice-appdata";
//
export const store = configureStore({
  reducer: {
    appdata: appDataReducer,
  },
});
