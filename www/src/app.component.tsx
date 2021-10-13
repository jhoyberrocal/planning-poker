import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container } from '@components/mui.components';
import CssBaseline from '@mui/material/CssBaseline';
import store from './redux/store';
import LoaderComponent from '@components/loader.component';
import LayoutBar from '@components/layout-bar.component';
import Router from './router';
import { ThemeDefault } from '@lib/theme';

const theme = createTheme(ThemeDefault);

export function AppComponent() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoaderComponent />
        <Toaster position='top-left' />
        <LayoutBar />
        <Container maxWidth='lg' sx={{ my: 10 }}>
          <Router />
        </Container>
        <Box sx={{ textAlign: 'center' }}>
          <span>Power by Jhoy Berrocal</span>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}
