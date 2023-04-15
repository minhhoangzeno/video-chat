import { Col, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useAppSelector } from "./app/hooks";
import { GetAuthorConversation } from "./app/reducers/Author/AuthorConversation.reducer";
import { GetChatList } from "./app/reducers/Chat/ChatList.reducer";
import AppBar from "./components/AppBar/AppBar";
import Author from "./components/Author/Author";
import ChatScreen from "./components/ChatScreen/ChatScreen";
import ImportFile from "./components/ImportFile/ImportFile";
import Loading from "./components/Loading/Loading";
import MessageList from "./components/MessageList";
import { AppContext } from "./context/AppContext";
import { IAuthor } from "./interface/Author.interface";
const bipSound = require("./images/messageSend.mp3");

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  

  const authorConservation = useAppSelector(GetAuthorConversation);
  // const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // const [messageList, setMessageList] = useState<string[]>([]);
  // const [messageChats, setMessageChats] = useState<ISubtitle[]>([]);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [loadPercent, setLoadPercent] = useState<number>(0);
  // const [showHelp, setShowHelp] = useState<boolean>(false);
  
  const playBip = () => {
    const audio = new Audio(bipSound);
    audio.volume = 0.7;
    audio.addEventListener("canplaythrough", () => {
      audio.play();
    });
  };
  
  return (
    <>
      <AppContext.Provider
        value={{
          playBip,
          setShowLoading,
          setLoadPercent,
          appRef,
          loadPercent,
         
        }}
      >
        <Row className="p-4">
          <Col span={16}>
            <Row className="justify-between mb-6 pr-4">
              {authorConservation.map((el: IAuthor, index: number) => {
                return <Author key={index} author={el} />;
              })}
            </Row>
            <Row>
              <ImportFile />
            </Row>
            <Row className="pr-4">
              <MessageList />
            </Row>
          </Col>

          <Col span={8}>
            <div className="conntainer">
              {showLoading ? <Loading /> : <></>}
            
              <div ref={appRef}>
                <AppBar />
                <ChatScreen />
              </div>
            </div>
          </Col>
        </Row>
      </AppContext.Provider>
    </>
  );
}

export default App;
