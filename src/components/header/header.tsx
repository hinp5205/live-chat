import { socket } from '@api/socket';
import exitIcon from '@assets/icons/exit.svg';
import chatIcon from '@assets/icons/message.svg';
import { STEP_ROOM } from '@constants/index';
import { changeStep, selectorUsernameLogged } from '@store/app/app.slice';
import { useAppDispatch } from '@store/hooks';
import { useSelector } from 'react-redux';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const usernameLogged = useSelector(selectorUsernameLogged);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();

    socket.emit('leave_room', {
      username: usernameLogged.username,
      room: usernameLogged.room,
      __createdtime__,
    });
    dispatch(changeStep(STEP_ROOM));
  };

  return (
    <div className='header-container'>
      <div className='header-left'>
        <img className='chat-icon' src={chatIcon} alt='' />
        <h4 className='title'>{usernameLogged.username}</h4>
      </div>
      <div className='header-right'>
        <div onClick={leaveRoom} className='icon info-icon'>
          <img src={exitIcon} alt='' />
        </div>
        {/* <Popover
          showArrow
          trigger='hover'
          triggerNode={
            <div
              className='icon info-icon'
              style={{ backgroundImage: `url('${exitIcon}')` }}
            />
          }
        >
          <div className='leave-room' onClick={leaveRoom}>
            Rời phòng
          </div>
        </Popover> */}
      </div>
    </div>
  );
};

export default Header;
