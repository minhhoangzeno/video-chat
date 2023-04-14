import { ISubtitle } from "../interface/Subtitle.interface";
import { RecordVideoHelper } from "./RecordVideo.helper";

export const SaveVideoHelper = async (
  messageList: ISubtitle[],
  setShowLoading: (el: boolean) => void,
  setLoadPercent: (el: number) => void,
  appRef: React.RefObject<HTMLDivElement>,
  chatList: ISubtitle[],
  handleUpdateChatList: (el: ISubtitle) => void
) => {
  const duration = 1000 * messageList[messageList.length - 1].endSeconds;

  const updateIntervalMS = 1000;
  const updatePercent = (100 * updateIntervalMS) / duration;
  let timeSpent = 0;

  setShowLoading(true);
  const percentInterval = setInterval(() => {
    if (timeSpent >= 100) {
      clearInterval(percentInterval);
      return;
    }
    timeSpent += updatePercent;
    setLoadPercent(timeSpent);
  }, updateIntervalMS);

  await RecordVideoHelper(appRef, messageList, chatList, handleUpdateChatList);

  setShowLoading(false);
  setLoadPercent(0);
};
