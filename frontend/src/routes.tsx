import { Route } from 'react-router-dom';

import { Home } from './pages/home';

const routes = [
  {
    path: '',
    component: Home,
  },
];

const renderRoutes = () =>
  routes.map(route => {
    return <Route key={route.path} path={route.path} element={<route.component />} />;
  });

export default renderRoutes;
