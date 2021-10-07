import React, { useState } from 'react';
import { CardContent, Card, Grid, TextField, Container, LoadingButton } from '~/src/components/mui.components';
import { connect, useDispatch, useStore } from 'react-redux';
import { SET_LOADER } from '~/src/redux/modules/ui/ui.types';

export function LoginView({ loader }) {
    const [form, setForm] = useState({email: '', password: ''});
    const dispatch = useDispatch();

    const login = () => {
        dispatch({ type: SET_LOADER, payload: true });
        setTimeout(() => {
            dispatch({ type: SET_LOADER, payload: false });
        }, 3000);
    };

    const handleChange = (ev) => setForm({ ...form, [ev.target.name]: ev.target.value });

    return (
        <Container>
            <Card sx={{width: '60%', margin: '4rem auto'}}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <h1>Iniciar sesión</h1>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{mt: 2}}
                                type="password"
                                label="Password"
                                variant="outlined"
                                name="password"
                                fullWidth
                                value={form.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton loading={loader} sx={{mt: 2}} onClick={login}>Login</LoadingButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

const mapStateToProps = (state) => {
    const { loader } = state.Ui;
    return { loader };
}

export default connect(mapStateToProps)(LoginView);
