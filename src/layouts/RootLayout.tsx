import { Outlet, Link, ScrollRestoration, useNavigation } from 'react-router-dom';

const RootLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <nav className="top-nav">
        <div className="nav-text-large">My App</div>
        <ul className="nav-list">
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/todos">Todos</Link>
          </li>
        </ul>
      </nav>
      <ScrollRestoration />
      {navigation.state === 'loading' && <div className="loading-spinner" />}
      <div className={`container ${navigation.state === 'loading' ? 'loading' : ''}`}>
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
