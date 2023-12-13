import { socket } from '@api/socket';
import { PositionMention } from '@appTypes/base';
import { filterValueIntoElement } from '@utils/filterValueIntoElement';
import { getCaretPositionElement } from '@utils/getCaretPositionElement';
import { getMentionUser } from '@utils/getMentionUser';
import { replaceSpecificString } from '@utils/replaceSpecificString';
import { forwardRef, useEffect, useState } from 'react';

interface MentionInputProps {
  data: FilterUsers[];
  onEnterPress: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  placeholder?: string;
}

interface FilterUsers {
  id: string;
  username: string;
}

const MentionInput = forwardRef<HTMLDivElement, MentionInputProps>(
  ({ data, onEnterPress, placeholder }, ref) => {
    const [mention, setMention] = useState<null | PositionMention>({
      positionEnd: -1,
      positionStart: -1,
      mention: '',
    });
    const [filterUsers, setFilterUsers] = useState<FilterUsers[]>([]);

    useEffect(() => {
      if (!!mention?.mention) {
        setFilterUsers(
          data.filter((user) =>
            user.username.includes(mention.mention.substring(1)),
          ),
        );
      }
    }, [JSON.stringify(mention), JSON.stringify(data)]);

    const onInput = (e: React.FormEvent<HTMLDivElement>) => {
      if (!e.currentTarget.textContent) {
      }

      const valueFocus = filterValueIntoElement(
        e.currentTarget,
        getCaretPositionElement(e.currentTarget),
      );
      const mention = getMentionUser(
        valueFocus.caretPos,
        e.currentTarget.innerHTML,
      );
      setMention(mention);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        onEnterPress(e);
      }
    };

    const onSelectItem = (user: FilterUsers) => {
      if (mention && document.getElementById('mention-input-id')) {
        document.getElementById('mention-input-id').innerHTML =
          replaceSpecificString(
            document.getElementById('mention-input-id').innerHTML,
            mention.positionStart,
            mention.positionEnd,
            `<span class="tagged-user" spellcheck="false" contenteditable="false">@${user.username}</span>` +
              '&nbsp;',
          );

        setFilterUsers([]);
        setMention(null);
      }
    };

    const onFocus = () => {
      socket.emit('user_typing', { isTyping: true });
    };

    const onBlur = () => {
      socket.emit('user_typing', { isTyping: false });
    };

    return (
      <div className='mention-input-container'>
        {!!filterUsers.length && (
          <div className='suggestion-container'>
            <ul className='suggestion'>
              {filterUsers.map((user) => (
                <li
                  key={user.id}
                  className='suggestion-item'
                  onClick={() => onSelectItem(user)}
                >
                  <span>{user.username}</span>
                  <span>{user.id}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div
          className='mention-input'
          contentEditable={true}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          suppressContentEditableWarning
          ref={ref}
          id='mention-input-id'
        >
          <div data-placeholder={placeholder}></div>
        </div>
      </div>
    );
  },
);

export default MentionInput;
