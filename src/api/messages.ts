import { IMessage } from '@appTypes/live-chat.types';
import httpClient from './interceptor';

export const getMessages = () => {
  return httpClient.get('/api/message');
};

export const addMessages = (message: IMessage) => {
  return httpClient.post('/api/message', message);
};
