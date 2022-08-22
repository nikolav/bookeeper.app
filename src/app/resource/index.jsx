import { useEffect, useState, createContext, useContext } from "react";
import {
  // useQueryResourceBase,
  useQueryMain,
} from "../../hooks";
//
const ResourceMainContext = createContext();
//
export const useResourceMain = () => useContext(ResourceMainContext);
////
////
export function ResourceMainProvider({ children }) {
  const [resourceMain, setResourceMain] = useState(null);
  const query = useQueryMain();
  //
  useEffect(() => {
    if (!query.isLoading && query.error) return;
    if (!query.isLoading && !query.error && query.data)
      setResourceMain(query.data.data);
  }, [query.error, query.isLoading, query.data?.data]);
  //
  const value = { resourceMain, query };
  //
  return (
    <ResourceMainContext.Provider value={value}>
      {children}
    </ResourceMainContext.Provider>
  );
}
