import React from 'react';

export default [{
    path: '/login',
    component: React.lazy(() => import('@views/auth/login.view'))
}];