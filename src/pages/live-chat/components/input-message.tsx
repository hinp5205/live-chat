import smileIcon from '@assets/icons/smiley-icon.svg';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useRef } from 'react';
// import { socket } from '../../../socket';
import { socket } from '@api/socket';
// import MentionInput from '@components/mention-input';
import { TypingUser } from '@appTypes/base';
import Popover from '@components/base/popover';
import MentionInput from '@components/mention-input';
import { selectorUsernameLogged, selectorUsers } from '@store/app/app.slice';
import { useAppSelector } from '@store/hooks';
import { filterValueIntoElement } from '@utils/filterValueIntoElement';
import { getCaretPositionElement } from '@utils/getCaretPositionElement';
import { replaceSpecificString } from '@utils/replaceSpecificString';
import { v4 as uuidv4 } from 'uuid';

interface IInputMessage {
  handlePushMessage: () => void;
  typing: TypingUser;
}

export const InputMessage: React.FC<IInputMessage> = ({
  handlePushMessage,
  typing,
}) => {
  const ref = useRef<HTMLFormElement>(null);
  const refInput = useRef<HTMLDivElement>();
  const userLogged = useAppSelector(selectorUsernameLogged);
  const users = useAppSelector(selectorUsers);

  const onEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13 && ref.current) {
      e.preventDefault();
      e.stopPropagation();
      handlePushMessage();
      socket.emit('addMessage', {
        id: uuidv4(),
        username: userLogged.username,
        message: refInput.current.innerHTML,
        room: userLogged.room,
      });
      refInput.current.innerHTML =
        '<div data-placeholder="@ để tương tác"></div>';
    }
  };

  const handleSelectEmoji = (e: EmojiClickData) => {
    const positionCaret = getCaretPositionElement(refInput.current);
    const valueIntoElement = filterValueIntoElement(
      refInput.current,
      positionCaret,
    );

    refInput.current.innerHTML = replaceSpecificString(
      refInput.current.innerHTML,
      valueIntoElement.caretPos,
      valueIntoElement.caretPos,
      e.emoji,
    );
  };

  return (
    <>
      <form className='form-input' ref={ref}>
        <MentionInput
          ref={refInput}
          data={users}
          onEnterPress={onEnterPress}
          placeholder='@ để tương tác'
        />

        {typing.isTyping && (
          <div className='typing-container'>
            <div className='typing'>
              {typing.user?.username} typing <div>.</div>
              <div>.</div>
              <div>.</div>
            </div>
          </div>
        )}
        <Popover
          showArrow
          triggerNode={
            <div className='emoji' id='emoji-id'>
              <img width={24} height={24} src={smileIcon} alt='' />
            </div>
          }
          trigger='click'
        >
          <EmojiPicker
            width={300}
            height={300}
            searchDisabled
            onEmojiClick={handleSelectEmoji}
            autoFocusSearch={false}
          />
        </Popover>
      </form>
    </>
  );
};
