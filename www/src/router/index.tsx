import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthRoutes from './auth/auth.routes';

const routes = [
    ...AuthRoutes,
    {
        path: '/',
        component: React.lazy(() => import('@views/home.view')),
    }
];

export function Router() {
    const Routes = routes.map(
        ({ path, component }, idx) =>
            <Route exact key={idx} path={path} component={component} />)
    return (
        <Suspense fallback={<span>Loading ... </span>}>
            <BrowserRouter>
                <Switch>
                    { Routes }
                </Switch>
            </BrowserRouter>
        </Suspense>
    );
}
