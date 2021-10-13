import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AuthRoutes from './auth/auth.routes';
import AdminRoutes from './admin/admin.routes';
import { connect } from 'react-redux';
import { StoreState } from '@redux/store';
import { RouteMetaData } from '@lib/types/router.types';
import { UserState } from '@redux/modules/user/user.types';

const publicRoutes = [
  ...AdminRoutes,
  ...AuthRoutes,
  {
    path: '/',
    component: React.lazy(() => import('@views/home.view')),
  }
];

const Router: React.FC<UserState> = ({ isAuth }: UserState) => {
  const Routes = publicRoutes.map(
    (route: RouteMetaData, idx) =>
      <Route
        key={idx}
        path={route.path}
        render={
          () => isAuth || !route.auth ? <route.component /> : <Redirect to="/" />
        }
        exact
      />
    );
  return (
    <Suspense fallback={<span>Loading ... </span>}>
      <BrowserRouter>
        <Switch>
          {Routes}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

const mapStateToProps = (state: StoreState) => {
  const { isAuth } = state.User;
  return { isAuth };
};

export default connect(mapStateToProps)(Router);
