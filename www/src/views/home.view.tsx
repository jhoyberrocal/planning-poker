import React from 'react';
import { useDispatch } from 'react-redux';
import { SET_LOADER } from '@redux/modules/ui/ui.types';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Card, CardContent, Grid, TextField } from '@components/mui.components';
import PokerImg from '@assets/png/003-pker-1.png';

export default function HomeView() {
  const dispatch = useDispatch();
  const setLoader = () => {
    dispatch({ type: SET_LOADER, payload: true });
    setTimeout(() => {
      dispatch({ type: SET_LOADER, payload: false });
    }, 3000);
  };
  return (
    <Card elevation={0}>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <h1>Welcome !!!</h1>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <h1>Name</h1>
            <TextField
              label='Introduce your name'
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