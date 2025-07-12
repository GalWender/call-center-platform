import { Navigate, Route } from 'react-router-dom';

import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';

import NotFound from './pages/NotFound';

const renderRoutes = () => (
  <>
    <Route path="/" element={<Navigate to="/user" replace />} />

    <Route path="/admin" element={<AdminPage />} />

    <Route path="/user" element={<UserPage />} />

    <Route path="*" element={<NotFound />} />
  </>
);

export default renderRoutes;
