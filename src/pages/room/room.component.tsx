import { socket } from '@api/socket';
import { Button } from '@components/base/button';
import { Input } from '@components/base/input';
import { STEP_LIVE_CHAT } from '@constants/index';
import { changeStep, setUsernameLogged } from '@store/app/app.slice';
import { useAppDispatch } from '@store/hooks';
import { useCallback, useEffect, useState } from 'react';

const Room: React.FC = () => {
  const [rooms, setRooms] = useState<string[]>([]);
  const [errorInput, setErrorInput] = useState<boolean>(false);
  const [valInput, setValInput] = useState<string>('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    function getRooms(rooms: string[]) {
      setRooms(rooms);
    }

    socket.emit('get_rooms');
    socket.on('rooms', getRooms);
    return () => {
      socket.off('rooms', getRooms);
    };
  }, []);

  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, room: string) => {
      e.preventDefault();
      e.stopPropagation();

      if (!valInput) {
        setErrorInput(true);
        return;
      }

      socket.emit('join_room', {
        username: valInput,
        room,
      });
      dispatch(changeStep(STEP_LIVE_CHAT));
      dispatch(
        setUsernameLogged({
          username: valInput,
          room: room.toString(),
        }),
      );
    },
    [valInput],
  );

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValInput(e.currentTarget.value);
    setErrorInput(false);
  };

  return (
    <form className='form-container'>
      <div className='room-container'>
        <div className='title-container'>
          <h2 className='title'>SB Team</h2>
          <Input
            value={valInput}
            onChange={onChange}
            placeholder='Username...'
            error={errorInput}
            errorText='Please fill username'
          />
        </div>
        <div className='room-items-container'>
          <p>Select your room</p>
          {rooms.map((room) => (
            <div key={room} className='room-items'>
              <p className='room-title'>{room}</p>
              <Button onClick={(e) => onSubmit(e, room)}>Join room</Button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default Room;
