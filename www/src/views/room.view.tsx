import React, { useEffect, useState } from 'react';
import { Card, CardContent, PokerCard, DeckCards, CardHeader, Button } from '@components/mui.components';
import './room.view.scss';
import IO from '@lib/sockets';
import { useParams } from 'react-router-dom';
import { ST_USER_ID } from '@lib/constants.const';

const RoomView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState<any>({});
  const [reveal, setReveal] = useState(false);
  const fibonacci: number[] = [0, 1, 2, 5, 8, 13];
  let revealCards;

  const getUsers = () => IO.emit('UsersInARoom', id, (res: any) => {
    const ME = res.find((user: any) => user.id === localStorage.getItem(ST_USER_ID));
    setUser(ME);
    setUsers(res);
    IO.emit('updateConnectionToRoom', id);
  });

  const setNumber = (point: number) => {
    IO.emit('UpdatePoint', {
      room: id,
      id: user.id,
      point,
    }, (response: any) => setUsers(response));
    setUser({...user, point});
  }

  useEffect((): any => {
    IO.open();
    getUsers();
    IO.on('UserJoined', data => setUsers(data));
    IO.on('AUserUpdated', getUsers);
    IO.on('RevealCards', data => setReveal(data));
    return () => IO.close();
  }, []);

  if (user.rol === 1) {
    revealCards = (
      <React.Fragment>
        <Button
          variant='contained'
          onClick={() => {
            IO.emit('RevealCards', {room: id, reveal: !reveal });
            setReveal(!reveal);
          }}
        >
          Reveal Cards
        </Button>
        <br/>
        <Button
          color='secondary'
          variant='contained'
          sx={{ my: 2 }}
          onClick={() => {
            IO.emit('RefreshPoints', id, (res: any) => setUsers(res));
            IO.emit('RevealCards', {room: id, reveal: false });
            setReveal(false);
          }}
        >
          Refresh Cards
        </Button>
      </React.Fragment>
    );
  }

  return (
    <Card elevation={0}>
      <CardHeader subheader={`Room: ${id}`}/>
      <CardContent>
        <section className='grid-cards'>
          {users.map((doc: any) => (
            <PokerCard
              key={doc.id}
              name={doc.name}
              reveal={reveal}
              rol={doc.rol}
              point={doc.point}
            />
          ))}
        </section>
        <DeckCards disabled={reveal || user.rol === 1} value={user.point} cards={fibonacci} setNumber={ev => setNumber(ev)}/>
        {revealCards}
      </CardContent>
    </Card>
  );
};

export default RoomView;