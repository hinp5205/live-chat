import { ChatRoomUsers } from '@appTypes/base';
import { STEP_ROOM } from '@constants/index';
import {
  PayloadAction,
  createDraftSafeSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '..';

interface InitState {
  step: string;
  users: ChatRoomUsers[];
  usernameLogged: IUsernameLogged;
}

interface IUsernameLogged {
  username: string;
  room: string;
}

const initialState: InitState = {
  step: STEP_ROOM,
  users: [],
  usernameLogged: {
    username: '',
    room: '',
  },
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeStep: (state, action: PayloadAction<string>) => {
      state.step = action.payload;
    },
    setUsers: (state, action: PayloadAction<ChatRoomUsers[]>) => {
      state.users = action.payload;
    },
    setUsernameLogged: (state, action: PayloadAction<IUsernameLogged>) => {
      state.usernameLogged = action.payload;
    },
  },
});

const selectSelf = (state: RootState) => state.app;
export const selectorStep = createDraftSafeSelector(
  selectSelf,
  (state) => state.step,
);

export const selectorUsers = createDraftSafeSelector(
  selectSelf,
  (state) => state.users,
);

export const selectorUsernameLogged = createDraftSafeSelector(
  selectSelf,
  (state) => state.usernameLogged,
);

export const { changeStep, setUsers, setUsernameLogged } = appSlice.actions;

export default appSlice;
