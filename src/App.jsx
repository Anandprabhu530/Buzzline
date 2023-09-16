import Sign_Up from "./sign_up";
import Login from "./login";
import Homepage from "./Homepage";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "./context/authcontext";

const App = () => {
  const { myself } = useContext(Authcontext);

  const ProtectedRoute = ({ children }) => {
    if (!myself) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Sign_Up />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
