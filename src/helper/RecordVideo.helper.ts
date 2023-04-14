import delay from "delay";
import { toCanvas } from "html-to-image";
import { ISubtitle } from "../interface/Subtitle.interface";
import { ReplayVideoHelper } from "./ReplayVideo.helper";

const bipSound = require("../assets/images/audio.mp3");
export const RecordVideoHelper = async (
  appRef: React.RefObject<HTMLDivElement>,
  messageList: ISubtitle[],
  chatList: ISubtitle[],
  handleUpdateChatList: (el: ISubtitle) => void
) => {
  if (appRef.current) {
    let canvas = await toCanvas(appRef.current);
    const ctx: any = canvas.getContext("2d");

    const stream = canvas.captureStream(15);

    const audio = new Audio(bipSound);
    const ctxAudio = new window.AudioContext();
    const stream_dest = ctxAudio.createMediaStreamDestination();
    const source = ctxAudio.createMediaElementSource(audio);
    source.connect(stream_dest);
    const streamAudio = stream_dest.stream;
    audio.play();

    const interval = setInterval(async () => {
      if (appRef.current) {
        ctx.drawImage(await toCanvas(appRef.current), 0, 0);
      }
    }, 50);

    ReplayVideoHelper(messageList, chatList, handleUpdateChatList);
    const recordDurationMS =
      1000 * messageList[messageList.length - 1].endSeconds;
    console.log("data : ");
    let recordedBlob = new Blob(
      await startRecording(recordDurationMS, stream, streamAudio),
      {
        type: "video/webm",
      }
    );
    clearInterval(interval);
    console.log(recordedBlob);
    const saveSrc = window.URL.createObjectURL(recordedBlob);

    const link = document.createElement("a");
    link.download = "RecordedVideo.mp4";
    link.href = saveSrc;
    link.click();
  }
};

async function startRecording(duration: number,
  stream: MediaStream,
  streamAudio: MediaStream) {
  const streamRecord = new MediaStream([
    stream.getTracks()[0],
    ...streamAudio.getTracks(),
  ]);
  let recorder = new MediaRecorder(streamRecord);
  let data: any[] = [];

  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();
  console.log(`${recorder.state} for ${duration / 1000} seconds…`);

  let stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = (event: any) => reject(event.name);
  });

  let recorded = delay(duration).then(() => {
    if (recorder.state === "recording") {
      recorder.stop();
    }
  });

  await Promise.all([stopped, recorded]);
  return data;
}
