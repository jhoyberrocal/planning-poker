import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import store from './redux/store';
import LoaderComponent from '@components/loader/loader.component';
import Router from './router';

const theme = createTheme({
    palette: {},
});

export function AppComponent() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <LoaderComponent />
                <Router />
            </ThemeProvider>
        </Provider>
    );
}
