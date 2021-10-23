import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@components/mui.components';
import CssBaseline from '@mui/material/CssBaseline';
import store from './redux/store';
import LoaderComponent from '@components/loader.component';
import LayoutBar from '@components/layout-bar.component';
import Router from './router';
import { ThemeDefault } from '@lib/theme';
import './app.component.scss';
import IO from '@lib/sockets';

const theme = createTheme(ThemeDefault);

export const AppComponent: React.FC = () => {
  useEffect(() => {
    IO.on('connect', () => {
      console.log('Connected');
    });
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <LoaderComponent />
          <Toaster position='top-left' />
          <LayoutBar />
          <Box sx={{ textAlign: 'center' }}>
            <span>Power by Jhoy Berrocal</span>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
