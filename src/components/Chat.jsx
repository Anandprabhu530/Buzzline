import more from "../images/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { Chatcontext } from "../context/chatcontext";

const Chat = () => {
  const { data } = useContext(Chatcontext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chaticons">
          <img src={more} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
