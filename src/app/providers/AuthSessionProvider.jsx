import { createContext, useContext, useEffect, useState } from "react";
import { supabase as client } from "../services";

//
export const AuthSessionContext = createContext();
export const useAuthSession = () => useContext(AuthSessionContext);

export default function AuthSessionProvider({ children }) {
  const [session, setSession] = useState(null);
  //
  useEffect(() => {
    let session_;
    // handle session status updates
    client.auth.onAuthStateChange((eType, session) => {
      if ("SIGNED_OUT" == eType) return setSession(null);
      if ("SIGNED_IN" == eType) return setSession(session);
    });
    // fetch session @mount
    session_ = client.auth.session();
    if (session_) {
      setSession(session_);
    }
  }, []);
  //
  return (
    <AuthSessionContext.Provider value={session}>
      {children}
    </AuthSessionContext.Provider>
  );
}
