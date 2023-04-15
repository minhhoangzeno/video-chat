import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  GetChatList,
  UpdateChatList,
} from "../../app/reducers/Chat/ChatList.reducer";
import { GetMessageList } from "../../app/reducers/Message/MessageList.reducer";
import emojiIcon from "../../assets/icons/face-smile.png";
import sendIcon from "../../assets/icons/paper-plane.png";
import { ISubtitle } from "../../interface/Subtitle.interface";
import ChatMessage from "../ChatMessage/ChatMessage";
import "./index.css";
const ChatScreen = () => {
  //States
  const chatList = useAppSelector(GetChatList);
  const chatRef = useRef<HTMLDivElement>(null);

  const messageList = useAppSelector(GetMessageList);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(UpdateChatList(messageList));
  }, [messageList, dispatch]);

  // useEffect(() => {
  //   const offsetTop = document.getElementById("lastMessageRef")?.offsetTop;
  //   if (chatRef.current && offsetTop) {
  //     chatRef.current.scrollTo(0, offsetTop);
  //   }
  // }, [chatList]);

  return (
    <div className="chatScreen">
      <div className="chatMessages" ref={chatRef} id="chatMessages">
        {chatList.map((message: ISubtitle, index: number) => {
          return (
            <ChatMessage
              text={message.text}
              key={index}
              msgId={message.id}
              left={message.author.title !== "Bạn"}
              componentRef={index === chatList.length - 1 ? "lastMessageRef" : ""}
            />
          );
        })}
      </div>

      <div className="chatBar">
        <div className="chatInput">
          <img className="emojiIcon" src={emojiIcon} alt="emoji" />
          <textarea className="chatBox" />
        </div>
        <div className="sendBtn">
          <img className="sendIcon" src={sendIcon} alt="send" />
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
