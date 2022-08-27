import { useEffect, useState, createContext, useContext } from "react";
import ready from "../util/ready";
import { debounce } from "../util";
import factoryJQuery from "../util/jquery/factory";

const ContextBrowser = createContext();
export const useBrowser = () => useContext(ContextBrowser);

export const BrowserContextProvider = ({ children }) => {
  const [w$, setw] = useState(null);
  const [d$, setd] = useState(null);
  const [m$, setm] = useState(false);
  const [r$, setr] = useState(false);
  const [jq$, setjq] = useState({ jQuery: null });
  //
  useEffect(() => {
    //
    const w = new Function("return this")();
    const d = w.document;
    const jQuery = factoryJQuery(w);
    //
    setw(w);
    setd(d);
    setm(true);
    ready(w, d)(() => setr(true));
    jQuery(() => setjq({ jQuery }));
    //
    return () => setm(false);
  }, []);
  //
  const api = {
    isMounted: m$,
    isReady: r$,
    jQuery: jq$.jQuery,
    window: w$,
    document: d$,
  };
  return (
    <ContextBrowser.Provider value={api}>{children}</ContextBrowser.Provider>
  );
};

// schedule callback to run in window .env
// take additionl flag to handle component window init @mount
//   e: string.event-name;
//   run: (evt: Event) => any; evt-handler
//   isActive: boolean; schedule @active
export const useWindowAddEvents = (e, run, isActive$ = true) => {
  const { window } = useBrowser();
  const cleanup = () => window?.removeEventListener(e, run);
  //
  useEffect(() => {
    isActive$ && window && window.addEventListener(e, run);
    return cleanup;
  }, [window, isActive$]);
  //
  return cleanup;
};

export const useWindowResizeEvent = (callback, isActive$ = true) => {
  const { jQuery: $, window } = useBrowser();
  const callback_ = debounce(callback, 155);
  useEffect(() => {
    isActive$ && window && $ && $(window).on("resize", callback_);
    return () => $ && $(window).off("resize", callback_);
  }, [isActive$, $, window]);
};
