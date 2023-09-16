import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Authcontextprovider } from "./context/authcontext";
import { Chatcontextprovider } from "./context/chatcontext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Authcontextprovider>
    <Chatcontextprovider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Chatcontextprovider>
  </Authcontextprovider>
);
