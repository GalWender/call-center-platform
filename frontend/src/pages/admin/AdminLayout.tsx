import { Link, Outlet } from 'react-router-dom';

export const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <nav className="admin-nav">
        <h2>Admin</h2>
        <ul>
          <li>
            <Link to="/admin/tags">Tags</Link>
          </li>
          <li>
            <Link to="/admin/suggested-tasks">Suggested Tasks</Link>
          </li>
        </ul>
      </nav>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
