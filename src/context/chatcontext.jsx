/* eslint-disable react/prop-types */

import { createContext, useContext, useReducer } from "react";
import { Authcontext } from "../context/authcontext";

export const Chatcontext = createContext();

export const Chatcontextprovider = ({ children }) => {
  const { myself } = useContext(Authcontext);
  const Initial_State = {
    chat_Id: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chat_Id:
            myself.uid > action.payload.uid
              ? myself.uid + action.payload.uid
              : action.payload.uid + myself.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, Initial_State);

  return (
    <Chatcontext.Provider value={{ data: state, dispatch }}>
      {children}
    </Chatcontext.Provider>
  );
};
