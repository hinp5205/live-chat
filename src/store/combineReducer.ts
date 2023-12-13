import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './app/app.slice';
import { liveChatSlice } from './live-chat';

export const reducers = combineReducers({
  liveChat: liveChatSlice.reducer,
  app: appSlice.reducer,
});
