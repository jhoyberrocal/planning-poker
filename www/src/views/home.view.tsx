import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { SET_LOADER } from '@redux/modules/ui/ui.types';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Card, CardContent, Grid, TextField } from '@components/mui.components';
import PokerImg from '@assets/png/003-pker-1.png';
import { StoreState } from '@redux/store';
import { setUsername } from '@redux/modules/user/user.actions';

type LayoutBarProps = {
  name: string;
};

const HomeView: React.FC<LayoutBarProps> = ({ name }: LayoutBarProps) => {
  const dispatch = useDispatch();
  const setLoader = () => {
    dispatch({ type: SET_LOADER, payload: true });
    setTimeout(() => {
      dispatch({ type: SET_LOADER, payload: false });
    }, 3000);
  };
  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(event.target.value));
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
            <Link to='/login'>Login</Link>
            <h2>Join a room</h2>
            <Button onClick={setLoader}>Show Loader</Button>
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
  const { name } = state.User;
  return { name: name as string };
}

export default connect(mapStateToProps)(HomeView);
