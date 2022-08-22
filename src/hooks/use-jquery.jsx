import { useState, useEffect, createContext, useContext } from "react";
import factoryJQuery from "../util/jquery/factory";

//
const ContextJquery = createContext();
export const useJQuery = () => useContext(ContextJquery);

export const JqueryProvider = ({ children }) => {
  const [jq$, setjq] = useState({ jQuery: null });

  useEffect(() => {
    const jQuery = factoryJQuery(window);
    jQuery(() => setjq({ jQuery }));
  }, []);

  return (
    <ContextJquery.Provider value={jq$}>{children}</ContextJquery.Provider>
  );
};
