import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

const theme = createTheme({
    palette: {},
});

export function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
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
    );
}
