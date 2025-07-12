import { NavLink } from 'react-router-dom';

export const AppHeader = () => {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <h1 className="app-header-logo">Call Center</h1>
        <nav className="app-header-nav">
          <NavLink
            to="/user"
            className={({ isActive }) => (isActive ? 'app-header-link active' : 'app-header-link')}
          >
            User
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? 'app-header-link active' : 'app-header-link')}
          >
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
