import { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { Chatcontext } from "../context/chatcontext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Messages = () => {
  const { data } = useContext(Chatcontext);
  const [messages, setmessgaes] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chat_Id), (doc) => {
      doc.exists() && setmessgaes(doc.data().messages);
    });
    return () => unsub();
  }, [data.chat_Id]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
