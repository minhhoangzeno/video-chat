import { ISubtitle } from "../interface/Subtitle.interface";
var { default: srtParser2 } = require("srt-parser-2");

export const ParseSrt = (text: string) => {
  var parser = new srtParser2();
  var srt_array: ISubtitle[] = parser.fromSrt(text);
  return srt_array;
};
