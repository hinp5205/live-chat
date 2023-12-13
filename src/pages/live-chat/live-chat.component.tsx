import { TypingUser } from '@appTypes/base';
import arrowDownIcon from '@assets/icons/arrow-down.svg';
import Header from '@components/header';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IMessage } from '../../types/live-chat.types';
import FrameChat from './components/frame-chat';
import { InputMessage } from './components/input-message';

interface LiveChatProps {
  receivedMessage: {
    message: string;
    isLogged?: boolean;
    username?: string;
    color?: string;
  };
  typing: TypingUser;
}

const LiveChat: React.FC<LiveChatProps> = ({ receivedMessage, typing }) => {
  const refFrameChat = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isDisabledAutoScroll, setDisabledAutoScroll] =
    useState<boolean>(false);

  useEffect(() => {
    if (refFrameChat.current && !isDisabledAutoScroll) {
      refFrameChat.current.scrollTo(0, refFrameChat.current.scrollHeight);
    }
  }, [JSON.stringify(messages), isDisabledAutoScroll]);

  useEffect(() => {
    if (receivedMessage.message) {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          isJoin: !!receivedMessage.isLogged,
          message: receivedMessage.message,
          username: receivedMessage.username,
          color: receivedMessage.color,
        },
      ]);
    }
  }, [JSON.stringify(receivedMessage)]);

  const handlePushMessage = () => {
    refFrameChat.current.scrollTo(0, refFrameChat.current.scrollHeight);
  };

  const handleScrollBottom = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    setDisabledAutoScroll(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
    e.stopPropagation();
    if (
      Math.ceil(e.currentTarget.scrollTop) <
      e.currentTarget.scrollHeight - e.currentTarget.clientHeight
    ) {
      setDisabledAutoScroll(true);
    } else {
      setDisabledAutoScroll(false);
    }
  };

  return (
    <>
      <Header />
      <div className='live-chat-container'>
        <div
          className='frame-chat-container'
          ref={refFrameChat}
          onScroll={handleScroll}
        >
          <div className='frame-chat'>
            <FrameChat messages={messages} />
          </div>
        </div>

        {isDisabledAutoScroll && (
          <button onClick={handleScrollBottom} className='arrow-down'>
            <img src={arrowDownIcon} width={16} height={16} />
          </button>
        )}
        <div className='input-message' id='input-message-id'>
          <InputMessage typing={typing} handlePushMessage={handlePushMessage} />
        </div>
      </div>
    </>
  );
};

export default LiveChat;
