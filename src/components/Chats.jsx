import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Authcontext } from "../context/authcontext";
import { Chatcontext } from "../context/chatcontext";

const Chats = () => {
  const [chats, setchat] = useState([]);

  const { myself } = useContext(Authcontext);
  const { dispatch } = useContext(Chatcontext);

  useEffect(() => {
    const getter = () => {
      const unsub = onSnapshot(doc(db, "usersChat", myself.uid), (doc) => {
        setchat(doc.data());
      });
      return () => {
        unsub();
      };
    };
    myself.uid && getter();
  }, [myself.uid]);

  const Handleclick = (us) => {
    dispatch({ type: "CHANGE_USER", payload: us });
  };
  return (
    <div className="chats">
      {Object.entries(chats)
        .sort((a, b) => b[1].date - a[1].date)
        .map((singleuser) => (
          <div
            className="userchat"
            key={singleuser[0]}
            onClick={() => Handleclick(singleuser[1].userInfo)}>
            <img src={singleuser[1].userInfo.photoURL} alt="" />
            <div className="userchatinfo">
              <span>{singleuser[1].userInfo.displayName}</span>
              <p>{singleuser[1].Lastmessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
