import { indigo, pink } from '@mui/material/colors';

export const ThemeDefault = {
  palette: {
    primary: {
      main: pink[500],
    },
    secondary: {
      main: indigo[500],
    },
    background: {
      default: '#e7eaf2',//#f6fcff
    },
    text: {
      primary: '#1F2667',
    },
  },
  typography: {
    fontFamily: [
      'Raleway',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
};
