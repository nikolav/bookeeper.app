import { useState, useEffect, createContext, useContext } from "react";
import { ref, onValue } from "firebase/database";
import { firebase } from "../services";

const { dbRealtime: db } = firebase;
//
export const GravatarsContext = createContext();
export const useGravatars = () => useContext(GravatarsContext);
//
export default function GravatarsProvider({ children }) {
  const [gravatarsDB, setGravatarsDB] = useState({});
  const refG = ref(db, "gravatar");
  //
  useEffect(
    () =>
      onValue(refG, (res) => {
        setGravatarsDB((current) => res.val() || current);
      }),
    []
  );
  //
  return (
    <GravatarsContext.Provider value={gravatarsDB}>
      {children}
    </GravatarsContext.Provider>
  );
}
