import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  setDoc,
  doc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Authcontext } from "../context/authcontext";

const Search = () => {
  const [username, setusername] = useState("");
  const [user, setuser] = useState(null);

  const { myself } = useContext(Authcontext);
  const handlehere = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setuser(doc.data());
    });
  };

  const handleenter = (e) => {
    e.code == "Enter" && handlehere();
  };

  const handleprofileclick = async () => {
    const id =
      myself.uid > user.uid ? myself.uid + user.uid : user.uid + myself.uid;
    const res = await getDoc(doc(db, "userChats", id));
    if (!res.exists()) {
      await setDoc(doc(db, "chats", id), { messages: [] });
    }

    await updateDoc(doc(db, "usersChat", myself.uid), {
      [id + ".userInfo"]: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      [id + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "usersChat", user.uid), {
      [id + ".userInfo"]: {
        uid: myself.uid,
        displayName: myself.displayName,
        photoURL: myself.photoURL,
      },
      [id + ".date"]: serverTimestamp(),
    });
    setuser(null);
    setusername("");
  };

  return (
    <div className="search">
      <div className="search-for">
        <input
          type="text"
          placeholder="Find user"
          onChange={(e) => setusername(e.target.value)}
          onKeyDown={handleenter}
          value={username}
        />
      </div>
      {user && (
        <div className="userchat" onClick={handleprofileclick}>
          <img src={user.photoURL} />
          <div className="userchatinfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
