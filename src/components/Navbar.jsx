import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { Authcontext } from "../context/authcontext";

const Navbar = () => {
  const { myself } = useContext(Authcontext);
  return (
    <div className="navabr">
      <span className="logo_inside">Chat App</span>
      <div className="user">
        <img src={myself.photoURL} />
        <span className="span-bel">{myself.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
