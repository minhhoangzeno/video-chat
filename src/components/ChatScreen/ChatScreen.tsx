import React, { useContext, useState } from "react";
import "./index.css";
import ChatMessage from "../ChatMessage/ChatMessage";
import sendIcon from "../../icons/paper-plane.png";
import emojiIcon from "../../icons/face-smile.png";
import { v4 as uuid } from "uuid";
import { AppContext } from "../../App";
const ChatScreen = () => {
  //States
  const [chatInput, setChatInput] = useState("");

  const { messageList, setMessageList, playBip, lastMessageRef } =
    useContext(AppContext);

  const chatInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChatInput(event.target.value);
  };
  const sendMessage = (self:boolean) => {
    let tmpMessageList = [...messageList];
    tmpMessageList.push({ msgId: uuid(), text: chatInput, self: self });
    setChatInput("");
    setMessageList(tmpMessageList);
    playBip();
  };
  return (
    <div className="chatScreen">
      <div className="chatMessages">
        {messageList.map((message:any, index:number) => {
          return (
            <ChatMessage
              text={message.text}
              key={message.msgId}
              msgId={message.msgId}
              left={message.self !== true}
              componentRef={
                index === messageList.length - 1 ? lastMessageRef : ""
              }
            />
          );
        })}
      </div>

      <div className="chatBar">
        <div className="chatInput">
          <img className="emojiIcon" src={emojiIcon} alt="emoji" />
          <textarea
            className="chatBox"
            value={chatInput}
            onChange={chatInputChange}
          />
        </div>
        <div className="sendBtn" onClick={()=>sendMessage(true)}>
          <img className="sendIcon" src={sendIcon} alt="send" />
        </div>
        <div className="sendBtn" onClick={()=>sendMessage(false)}>
          <img className="sendIcon" src={sendIcon} alt="send" />
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
