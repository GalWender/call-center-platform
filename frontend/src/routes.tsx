import { Navigate, Route } from 'react-router-dom';

import AdminLayout from './pages/admin/AdminLayout';
import SuggestedTasksPage from './pages/admin/SuggestedTasksPage';
import TagsPage from './pages/admin/TagsPage';

import CallDetailsPage from './pages/user/CallDetailsPage';
import CallsPage from './pages/user/CallsPage';
import UserLayout from './pages/user/UserLayout';

import NotFound from './pages/NotFound';

const renderRoutes = () => (
  <>
    <Route path="/" element={<Navigate to="/user/calls" replace />} />

    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Navigate to="tags" replace />} />
      <Route path="tags" element={<TagsPage />} />
      <Route path="suggested-tasks" element={<SuggestedTasksPage />} />
    </Route>

    <Route path="/user" element={<UserLayout />}>
      <Route path="calls" element={<CallsPage />} />
      <Route path="calls/:id" element={<CallDetailsPage />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </>
);

export default renderRoutes;
