import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import store from './redux/store';
import LoaderComponent from '@components/loader/loader.component';
import Router from './router';

const theme = createTheme({
    palette: {},
});

export const AppComponent: React.FC = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <LoaderComponent />
                <Router />
                <Toaster position="top-left" />
            </ThemeProvider>
        </Provider>
    );
}
