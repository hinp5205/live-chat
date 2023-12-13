export interface BaseState {
  isLoading?: boolean;
  isError?: boolean;
}

export interface ChatRoomUsers {
  id: string;
  room: string;
  username: string;
  color: string;
}

export interface PositionMention {
  positionStart: number;
  positionEnd: number;
  mention: string;
}

export interface TypingUser {
  user: ChatRoomUsers;
  isTyping: boolean;
}
