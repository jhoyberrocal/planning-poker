import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthRoutes from './auth/auth.routes';
import HomeView from '~/src/views/home.view';

const routes = [
    ...AuthRoutes,
    {
        path: '/',
        component: HomeView,
    }
];

export function Router() {
    const Routes = routes.map(({path, component}, idx) => <Route exact key={idx} path={path} component={component} />)
    return (
        <BrowserRouter>
            <Switch>
                {Routes}
            </Switch>
        </BrowserRouter>
    );
}
