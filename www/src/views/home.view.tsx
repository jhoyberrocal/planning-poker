import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, Grid, TextField, Button } from '@components/mui.components';
import PokerImg from '@assets/png/003-pker-1.png';
import { StoreState } from '@redux/store';
import { setUsername } from '@redux/modules/user/user.actions';
import IO from '@lib/sockets';
import { ST_USER_ID } from '@lib/constants.const';

type LayoutBarProps = {
  name: string;
  id: string;
};

const HomeView: React.FC<LayoutBarProps> = ({ name, id }: LayoutBarProps) => {
  const [room, setRoom] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem(ST_USER_ID)) {
      localStorage.setItem(ST_USER_ID, new Date().getTime().toString());
    }
  }, []);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(event.target.value));
  };

  const joinRoom = (room: string | null) => {
    const idRoom = room || btoa((new Date().getTime().toString())).slice(0, -2);
    IO.emit('JoinToRoom', {
      room: idRoom,
      name: name,
      rol: !!room ? 2 : 1,
      id: localStorage.getItem(ST_USER_ID),
    })
    history.push(`/room/${idRoom}`);
  };

  return (
    <Card elevation={0}>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <h1>Welcome !!!</h1>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <h1>{name}</h1>
            <TextField
              label='Change name'
              placeholder='Introduce your name'
              variant='outlined'
              value={name}
              onChange={changeName}
            />
            <h2>Create room</h2>
            <Button
              onClick={() => joinRoom(null)}
              variant='contained'
            >
              Create Room
            </Button>
            <h2>Join a room</h2>
            <TextField
              label='Code to room'
              variant='outlined'
              value={room}
              onChange={event => setRoom(event.target.value)}
            /><br/>
            <Button
              disabled={!room.length}
              onClick={() => joinRoom(room)}
              variant='contained'
              sx={{ my: 3 }}
            >
              Join  a room
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <img src={PokerImg} alt='Poker img' style={{ maxWidth: '100%' }} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state: StoreState): LayoutBarProps => {
  const { name, id } = state.User;
  return { name: name as string, id: id as string, };
}

export default connect(mapStateToProps)(HomeView);
