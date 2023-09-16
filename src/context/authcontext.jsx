/* eslint-disable react/prop-types */
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const Authcontext = createContext();

export const Authcontextprovider = ({ children }) => {
  const [myself, setmyself] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setmyself(user);
    });

    return () => {
      unsub();
    };
  }, []);
  return (
    <Authcontext.Provider value={{ myself }}>{children}</Authcontext.Provider>
  );
};
