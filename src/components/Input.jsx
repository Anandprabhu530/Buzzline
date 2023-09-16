import { useContext, useState } from "react";
import add from "../images/add.png";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { Authcontext } from "../context/authcontext";
import { Chatcontext } from "../context/chatcontext";

const Input = () => {
  const [text, settext] = useState("");
  const [image, setimage] = useState(null);

  const { myself } = useContext(Authcontext);
  const { data } = useContext(Chatcontext);

  const handlesend = async () => {
    if (image) {
      try {
        const storageRef = ref(storage, uuid());
        await uploadBytesResumable(storageRef, image).then(() => {
          getDownloadURL(storageRef).then(async (DownloadURL) => {
            try {
              await updateDoc(doc(db, "chats", data.chat_Id), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderID: myself.uid,
                  date: Timestamp.now(),
                  img: DownloadURL,
                }),
              });
            } catch (err) {
              console.log(err);
            }
          });
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      await updateDoc(doc(db, "chats", data.chat_Id), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderID: myself.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "usersChat", myself.uid), {
      [data.chat_Id + ".Lastmessage"]: {
        text,
      },
      [data.chat_Id + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "usersChat", data.user.uid), {
      [data.chat_Id + ".Lastmessage"]: {
        text,
      },
      [data.chat_Id + ".date"]: serverTimestamp(),
    });

    settext("");
    setimage(null);
  };
  return (
    <div className="input">
      <input
        type="text"
        value={text}
        onChange={(event) => settext(event.target.value)}
      />
      <div className="send">
        <img src="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(event) => {
            setimage(event.target.files[0]);
          }}
        />
        <label htmlFor="file">
          <img src={add} />
        </label>
        <button onClick={handlesend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
