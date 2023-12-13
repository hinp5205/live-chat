import { selectorUsernameLogged } from '@store/app/app.slice';
import { useAppSelector } from '@store/hooks';
import { IMessage } from '../../../types/live-chat.types';

// API will define it

interface IFrameChat {
  messages: IMessage[];
}

const FrameChat: React.FC<IFrameChat> = ({ messages }) => {
  const userLogged = useAppSelector(selectorUsernameLogged);

  return (
    <>
      {messages.map((data: IMessage) => {
        const isMe = userLogged.username === data.username;
        if (data.isJoin) {
          return (
            <p
              key={data.id}
              className='notify-join'
              style={{ color: data.color }}
            >
              {data.message}
            </p>
          );
        }

        if (isMe) {
          return (
            <p
              key={data.id}
              className='chat-box is-me'
              dangerouslySetInnerHTML={{ __html: data.message }}
            ></p>
          );
        }

        return (
          <p
            key={data.id}
            className='chat-box'
            aria-username={data.username}
            aria-placeholder={data.color}
            style={{ '--title-chat-box': data.color } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: data.message }}
          ></p>
        );
      })}
    </>
  );
};
export default FrameChat;
