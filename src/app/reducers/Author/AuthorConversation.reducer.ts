import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthor } from "../../../interface/Author.interface";
import { RootState } from "../../store";
import { v4 as uuid } from "uuid";
const initialState: IAuthor[] = [
  {
    id: uuid(),
    name: "Bạn",
    title: "Bạn",
    avatar: null,
  },
  {
    id: uuid(),
    name: "Khách",
    title: "Khách",
    avatar: null,
  },
];

const AuthorConversationSlice = createSlice({
  name: "authorConversation",
  initialState,
  reducers: {
    UpdateAuthorConversation: (state, action: PayloadAction<IAuthor[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { UpdateAuthorConversation } = AuthorConversationSlice.actions;
export const GetAuthorConversation = (state: RootState) =>
  state.authorConversation;
export default AuthorConversationSlice.reducer;
