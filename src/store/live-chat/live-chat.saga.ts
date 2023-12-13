import { addMessages, getMessages } from '@api/messages';
import { IMessage } from '@appTypes/live-chat.types';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  errorMessages,
  liveChatActions,
  setAllMessages,
} from './live-chat.action';

function* getAllSaga() {
  try {
    const response: AxiosResponse<IMessage[]> = yield getMessages();
    yield put(setAllMessages(response.data));
  } catch (error) {
    yield put(errorMessages());
  }
}

function* sendMessage({ payload }: PayloadAction<IMessage>) {
  try {
    yield addMessages(payload);
  } catch (error) {
    yield put(errorMessages());
  }
}

export function* watchLiveChat() {
  yield takeEvery(liveChatActions.REQUEST_ALL_MESSAGES, getAllSaga);
  yield takeLatest(liveChatActions.ADD_MESSAGE, sendMessage);
}
