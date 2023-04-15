import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISubtitle } from "../../../interface/Subtitle.interface";
import { RootState } from "../../store";

const initialState: ISubtitle[] = [];

const ChatListSlice = createSlice({
  name: "chatList",
  initialState,
  reducers: {
    UpdateChatList: (state, action: PayloadAction<ISubtitle[]>) => {
      state = action.payload;
      return state;
    },
    AddChatElement: (state, action: PayloadAction<ISubtitle>) => {
      state = [...state, action.payload];
      return state;
    },
    PreviewChatMessage: (state, action: PayloadAction<ISubtitle>) => {
      if (state.length > 3) {
        state = [];
      }
      state = [...state, action.payload];
      return state;
    },
  },
});

export const { UpdateChatList, AddChatElement, PreviewChatMessage } =
  ChatListSlice.actions;
export const GetChatList = (state: RootState) => state.chatList;
export default ChatListSlice.reducer;
