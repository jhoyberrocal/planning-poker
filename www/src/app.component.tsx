import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Provider } from 'react-redux';
import store from './redux/store';
import LoaderComponent from './components/loader/loader.component';

const theme = createTheme({
    palette: {},
});

export function AppComponent() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <LoaderComponent />
                <BrowserRouter>
                    <Switch>
                        <Route path="/">
                            <Container>
                                <Home />
                            </Container>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}
