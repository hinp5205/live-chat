import { io } from 'socket.io-client';

const URL = process.env.WS_SOCKET;

export const socket = io(URL, {
  autoConnect: false,
  transports: ['websocket'],
});
