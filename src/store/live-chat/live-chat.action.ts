import { LIVE_CHAT } from '../../types/live-chat.types';
import liveChatSlice from './live-chat.slice';

export const liveChatActions = {
  REQUEST_ALL_MESSAGES: `${LIVE_CHAT}/requestMessages`,
  ADD_MESSAGE: `${LIVE_CHAT}/addMessage`,
  SET_ALL_MESSAGE: `${LIVE_CHAT}/setAllMessages`,
};

export const {
  addMessage: addMessageAction,
  setAllMessages,
  errorMessages,
  requestMessages,
} = liveChatSlice.actions;
