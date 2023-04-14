import delay from "delay";
import { ISubtitle } from "../interface/Subtitle.interface";

export const ReplayVideoHelper = async (
  messageList: ISubtitle[],
  chatList: ISubtitle[],
  handleUpdateChatList: (el: ISubtitle) => void
) => {
  for (let i = 0; i < messageList.length; i++) {
    await delay(
      1000 * (messageList[i].endSeconds - messageList[i].startSeconds)
    );

    handleUpdateChatList(messageList[i]);
  }
};
