import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import AuthorConversationReducer from "./reducers/Author/AuthorConversation.reducer";
import ChatListReducer from "./reducers/Chat/ChatList.reducer";
import MessageListReducer from "./reducers/Message/MessageList.reducer";
export const store = configureStore({
  reducer: {
    messageList: MessageListReducer,
    chatList: ChatListReducer,
    authorConversation: AuthorConversationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
