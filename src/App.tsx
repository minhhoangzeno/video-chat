import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Upload } from "antd";
import { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import AppBar from "./components/AppBar/AppBar";
import ChatScreen from "./components/ChatScreen/ChatScreen";
import ImportFile from "./components/ImportFile/ImportFile";
import Loading from "./components/Loading/Loading";
import Menu from "./components/Menu/Menu";
import clock from "./images/clock.png";
import phoneStatus from "./images/phoneHeader.png";
const bipSound = require("./images/messageSend.mp3");

interface IValueContext {
  messageList: any;
  setMessageList: (el: any) => void;
  playBip: () => void;
  isMenuOpen: boolean;
  setShowLoading: (el: boolean) => void;
  setLoadPercent: (el: number) => void;
  appRef: any;
  setIsMenuOpen: (el: boolean) => void;
  loadPercent: number;
  lastMessageRef: any;
  setShowHelp: (el: boolean) => void;
}
export const AppContext = createContext({} as IValueContext);
function App() {
  const appRef = useRef<null | HTMLDivElement>();
  const lastMessageRef = useRef<null | HTMLDivElement>();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [messageList, setMessageList] = useState<string[]>([]);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  const playBip = () => {
    const audio = new Audio(bipSound);
    audio.volume = 0.7;
    audio.addEventListener("canplaythrough", () => {
      audio.play();
    });
  };

  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  return (
    <>
      <Row>
        <Col span={12}>
          <ImportFile />
        </Col>

        <Col span={12}>
          <AppContext.Provider
            value={{
              messageList,
              setMessageList,
              playBip,
              isMenuOpen,
              setShowLoading,
              setLoadPercent,
              appRef,
              setIsMenuOpen,
              loadPercent,
              lastMessageRef,
              setShowHelp,
            }}
          >
            <div className="conntainer">
              {showLoading ? <Loading /> : <></>}
              <Menu />
              <div>
                <div className="statusBar">
                  <img src={clock} alt="clock" />
                  <img id="phoneStatus" src={phoneStatus} alt="phone status" />
                </div>
                <AppBar />
                <ChatScreen />
              </div>
            </div>
          </AppContext.Provider>
        </Col>
      </Row>
    </>
  );
}

export default App;
