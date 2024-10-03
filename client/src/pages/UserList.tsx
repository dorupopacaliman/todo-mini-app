import { Link, useLoaderData } from 'react-router-dom';
import { getUsers } from '../api/users';
import { UserType } from '../types';

const UserList = () => {
  const users = useLoaderData() as UserType[];

  return (
    <>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {users.map(user => (
          <div className="card" key={user.id}>
            <div className="card-header">{user.name}</div>
            <div className="card-body">
              <div>{user.company.name}</div>
              <div>{user.website}</div>
              <div>{user.email}</div>
            </div>
            <div className="card-footer">
              <Link className="btn" to={user.id.toString()}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const userListLoader = async ({ request: { signal } }: { request: { signal: AbortSignal } }) => {
  return await getUsers({ signal });
};

export const userListRoute = {
  element: <UserList />,
  loader: userListLoader,
};
