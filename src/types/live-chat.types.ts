import { BaseState } from '@appTypes/base';

export const LIVE_CHAT = 'live-chat';

export interface IMessage {
  id: number | string;
  username?: string;
  message: string;
  color?: string;
  isJoin?: boolean;
}

export interface LiveChatState extends BaseState {
  messages: IMessage[];
}
