import React from 'react';
import { CardContent, Card, Grid, TextField, Container, LoadingButton } from '@components/mui.components';
import { connect, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { UiState } from '@redux/modules/ui/ui.types';
import { StoreState } from '@redux/store';
import { setLoader } from '@redux/modules/ui/ui.actions';
import { $httpClient } from '@lib/HttpClient';
import { LoginForm } from '@lib/types/auth/login';

export function LoginView({ loader }: UiState) {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const $http = $httpClient(process.env.API_URL as string);

  const login = async (data: LoginForm) => {
    dispatch(setLoader(true));
    const req = await $http.withBody(data).post('/auth/login');
    console.log(req);
    dispatch(setLoader(false));
  };

  return (
    <Container>
      <Card sx={{ width: '60%', margin: '4rem auto' }}>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <h1>Iniciar sesión</h1>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='email'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label='Email'
                    variant='outlined'
                    fullWidth
                    onChange={onChange}
                    value={value || ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='password'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    sx={{ mt: 2 }}
                    type='password'
                    label='Password'
                    variant='outlined'
                    fullWidth
                    onChange={onChange}
                    value={value || ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton loading={loader} sx={{ mt: 2 }} onClick={handleSubmit(login)}>Login</LoadingButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const mapStateToProps = (state: StoreState) => {
  const { loader } = state.Ui;
  return { loader };
};

export default connect(mapStateToProps)(LoginView);
