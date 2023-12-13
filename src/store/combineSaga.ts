import { all, fork } from 'redux-saga/effects';
import { watchLiveChat } from './live-chat';

const combineSaga = function* () {
  yield all([fork(watchLiveChat)]);
};

export default combineSaga;
