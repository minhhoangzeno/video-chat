import React, { useContext } from "react";
import { AppContext } from "../../App";
import "./index.css";

interface IChatMessageProps {
  left: any;
  text: any;
  msgId: any;
  componentRef: any;
}
const ChatMessage = ({
  left,
  text,
  msgId,
  componentRef,
}: IChatMessageProps) => {
  const { messageList, setMessageList } = useContext(AppContext);
  const messageClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.detail === 2) {
      let tmpMessageList = messageList.map((message:any) => {
        if (message.msgId === msgId) {
          message.self = !message.self;
        }
        return message;
      });
      setMessageList(tmpMessageList);
    }
  };
  const refProp =
    componentRef && componentRef !== "" ? { ref: componentRef } : {};
  return (
    <div
      onClick={messageClick}
      className={`message ${left && left === true ? "ml" : "mr"}`}
      {...refProp}
    >
      {text}
    </div>
  );
};

export default ChatMessage;
