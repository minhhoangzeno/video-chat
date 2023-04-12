import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISubtitle } from "../../../interface/Subtitle.interface";
import { RootState } from "../../store";

const initialState: ISubtitle[] = [];

const MessageListSlice = createSlice({
  name: "messageList",
  initialState,
  reducers: {
    UpdateMessageList: (state, action: PayloadAction<ISubtitle[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { UpdateMessageList } = MessageListSlice.actions;
export const GetMessageList = (state: RootState) => state.messageList;
export default MessageListSlice.reducer;
