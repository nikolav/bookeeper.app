import { createContext, useContext } from "react";
import { eventListener } from "../util";

export const AppEventsContext = createContext();
const useAppEvents = () => useContext(AppEventsContext);

export const AppEventsProvider = ({ children }) => {
  const e = eventListener();
  //
  return (
    <AppEventsContext.Provider value={e}>{children}</AppEventsContext.Provider>
  );
};

export default useAppEvents;
