/* eslint-disable react/prop-types */

import { useContext, useEffect, useRef } from "react";
import { Authcontext } from "../context/authcontext";
import { Chatcontext } from "../context/chatcontext";

const Message = ({ message }) => {
  const { myself } = useContext(Authcontext);
  const { data } = useContext(Chatcontext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message]);
  return (
    <div
      ref={ref}
      className={`message ${message.senderID === myself.uid && "owner"} `}
    >
      <div className="message-Info">
        <img
          src={
            myself.uid === message.senderID
              ? myself.photoURL
              : data.user.photoURL
          }
        />
        <span>just now</span>
      </div>
      <div className="messagecontent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} />}
      </div>
    </div>
  );
};

export default Message;
