import { useAppData, ADMIN, TEST } from "./slice-appdata";
import {
  useFlags,
  FLAG_TEST,
  FLAG_APP_IS_PROCESSING,
  FLAG_MENU_OPEN,
} from "./slice-flags";
import { useResourceMain } from "../resource";
// //
import { useColorMode } from "../providers/MuiThemeProvider";
import { useAuth, AUTH, AUTH_ERROR, AUTH_PROCESSING } from "./slice-auth";
// //
// import { useAuthApi } from "../../src/hooks/use-auth-api";
// //
import { useColorModeTW, MODE_LIGHT, MODE_DARK } from "./slice-color-mode-tw";
// //
const API_URL_dev = "http://localhost:3344/api";
const API_URL_production = "https://jeytgwpjlmm.herokuapp.com/api";
const REST_RESOURCE_main = "main";
const REST_RESOURCE_messages = "messages";
//
const AUTH_API_URL = "http://localhost:3344/authentication";
const AUTH_API_URL_users = "http://localhost:3344/users";
const AUTH_SESSION_TOKEN = "ulglwizzpxy";
//
const API_URL = API_URL_dev;
// const API_URL = API_URL_production;
//
const WORLD_ATLAS_COUNTRIES_50M = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
// const WORLD_ATLAS_COUNTRIES_50M = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
//
export {
  API_URL,
  API_URL_dev,
  API_URL_production,
  //
  AUTH_API_URL,
  AUTH_API_URL_users,
  AUTH_SESSION_TOKEN,
  //
  REST_RESOURCE_main,
  REST_RESOURCE_messages,
  //
  useAppData,
  ADMIN,
  TEST,
  //
  useFlags,
  FLAG_TEST,
  FLAG_APP_IS_PROCESSING,
  FLAG_MENU_OPEN,
  //
  useAuth,
  AUTH,
  AUTH_ERROR,
  AUTH_PROCESSING,
  //
  //   useAuthApi,
  //
  useColorModeTW,
  MODE_LIGHT,
  MODE_DARK,
  //   //
  useResourceMain,
  useColorMode,
  //
  WORLD_ATLAS_COUNTRIES_50M,
};
