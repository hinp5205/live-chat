import { socket } from '@api/socket';
import { ChatRoomUsers, TypingUser } from '@appTypes/base';
import { Layout } from '@components/layout';
import LiveChat from '@pages/live-chat';
import Room from '@pages/room';
import { selectorStep, setUsers } from '@store/app/app.slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { requestMessages } from '@store/live-chat';
import { randomColor } from '@utils/randomColor';
import { useEffect, useState } from 'react';
import './App.scss';
import { STEP_LIVE_CHAT, STEP_ROOM } from './constants';

function App() {
  const dispatch = useAppDispatch();
  const step = useAppSelector(selectorStep);

  const [receivedMessage, setReceivedMessage] = useState({
    message: '',
  });

  const [typing, setTyping] = useState<TypingUser>({
    isTyping: false,
    user: {
      id: '',
      username: '',
      room: '',
      color: '',
    },
  });

  useEffect(() => {
    socket.connect();
    dispatch(requestMessages());
    // listener when user log on room
    socket.on('receive_message', (data) => {
      setReceivedMessage({ ...data, color: randomColor(data.id) });
    });

    socket.on('chatroom_users', (data) => {
      dispatch(
        setUsers(
          data.map((i: ChatRoomUsers) => ({
            ...i,
            color: randomColor(i.id),
          })),
        ),
      );
    });

    socket.on('status_user_typing', (data) => {
      setTyping(data);
    });

    return () => {
      socket.off('receive_message');
      socket.off('chatroom_users');
      socket.disconnect();
    };
  }, []);

  return (
    <div className='App'>
      <Layout>
        {step === STEP_LIVE_CHAT && (
          <LiveChat receivedMessage={receivedMessage} typing={typing} />
        )}
        {step === STEP_ROOM && <Room />}
      </Layout>
    </div>
  );
}

export default App;
