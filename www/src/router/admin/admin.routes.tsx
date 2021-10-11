import React from 'react';

export default [{
  path: '/protected',
  component: React.lazy(() => import('@views/admin/protected.view')),
  auth: true,
}];