import { Link, Outlet } from 'react-router-dom';

export const UserLayout = () => {
  return (
    <div className="user-layout">
      <aside className="user-sidebar">
        <h2>Calls</h2>
        {/* sidebar implementation will fetch and list calls */}
        <Link to="/user/calls">All Calls</Link>
      </aside>

      <main className="user-main">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
