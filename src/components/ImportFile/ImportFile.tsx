import {
  CompressOutlined,
  RightSquareFilled,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Row, Tooltip, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GetAuthorConversation } from "../../app/reducers/Author/AuthorConversation.reducer";
import {
  AddChatElement,
  GetChatList,
  PreviewChatMessage,
  UpdateChatList,
} from "../../app/reducers/Chat/ChatList.reducer";
import {
  GetMessageList,
  UpdateMessageList,
} from "../../app/reducers/Message/MessageList.reducer";
import { AppContext } from "../../context/AppContext";
import { ParseSrt } from "../../helper/ParseSrt.helper";
import { ReplayVideoHelper } from "../../helper/ReplayVideo.helper";
import { SaveVideoHelper } from "../../helper/SaveVideo.helper";
import { TakeScreenShotHelper } from "../../helper/TakeScreenShot.helper";
import { ISubtitle } from "../../interface/Subtitle.interface";

export default function ImportFile() {
  const authorConservation = useAppSelector(GetAuthorConversation);
  const messageList = useAppSelector(GetMessageList);
  const chatList = useAppSelector(GetChatList);
  const dispatch = useAppDispatch();
  const { appRef, setShowLoading, setLoadPercent } = useContext(AppContext);

  const handleParseFile = (file: RcFile) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === "string") {
        const subs = ParseSrt(e.target.result);
        subs.forEach((sub) => {
          sub.authorId = authorConservation[0].id;
          sub.author = authorConservation[0];
        });
        dispatch(UpdateMessageList(subs));
      }
    };
    reader.readAsText(file);
    // Prevent upload
    return false;
  };

  const handleUpdateChatList = (el: ISubtitle) => {
    dispatch(PreviewChatMessage(el));
  };

  return (
    <Row className="mb-6 justify-between w-full pr-4">
      <Upload
        multiple={false}
        customRequest={(options) => {
          if (options.onSuccess) {
            options.onSuccess("ok");
          }
        }}
        maxCount={1}
        beforeUpload={handleParseFile}
        onRemove={() => {
          dispatch(UpdateMessageList([]));
          dispatch(UpdateChatList([]));
        }}
      >
        <Button icon={<UploadOutlined />}>Upload file srt</Button>
      </Upload>
      <Row>
        <Tooltip title="Take Screen Shot">
          <Button
            className="mr-6"
            onClick={() => {
              TakeScreenShotHelper(appRef);
            }}
          >
            <CompressOutlined />
          </Button>
        </Tooltip>

        <Tooltip title="Replay Video">
          <Button
            className="mr-6"
            onClick={() => {
              dispatch(UpdateChatList([]));
              ReplayVideoHelper(messageList, chatList, handleUpdateChatList);
            }}
          >
            <RightSquareFilled />
          </Button>
        </Tooltip>

        <Tooltip title="Save Video">
          <Button
            type="primary"
            onClick={() => {
              SaveVideoHelper(
                messageList,
                setShowLoading,
                setLoadPercent,
                appRef,
                chatList,
                handleUpdateChatList
              );
            }}
          >
            <VideoCameraOutlined />
          </Button>
        </Tooltip>
      </Row>
    </Row>
  );
}
