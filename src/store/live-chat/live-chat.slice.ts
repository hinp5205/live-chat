import {
  PayloadAction,
  createDraftSafeSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '@store/index';
import {
  IMessage,
  LIVE_CHAT,
  LiveChatState,
} from '../../types/live-chat.types';

const initialState: LiveChatState = {
  isLoading: false,
  isError: false,
  messages: [],
};

const liveChatSlice = createSlice({
  name: LIVE_CHAT,
  initialState,
  reducers: {
    requestMessages: (state: LiveChatState) => {
      state.isLoading = true;
      state.isError = false;
    },
    errorMessages: (state: LiveChatState) => {
      state.isLoading = false;
      state.isError = true;
    },
    addMessage: (state: LiveChatState, action: PayloadAction<IMessage>) => {
      console.log('sdfsdf');
      state.messages.push(action.payload);
    },
    setAllMessages: (
      state: LiveChatState,
      action: PayloadAction<IMessage[]>,
    ) => {
      state.isError = false;
      state.isLoading = false;
      state.messages = action.payload;
    },
  },
});

const selectSelf = (state: RootState) => state.liveChat;
export const selectorMessages = createDraftSafeSelector(
  selectSelf,
  (state) => state.messages,
);

export default liveChatSlice;
