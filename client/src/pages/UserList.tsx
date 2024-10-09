import { Suspense } from 'react';
import { Await, defer, Link, useLoaderData } from 'react-router-dom';
import { getUsers } from '../api/users';
import { Skeleton, SkeletonButton, SkeletonList } from '../components/Skeleton';
import { UserType } from '../types';

const UserCard = ({ user }: { user?: UserType }) => {
  return (
    <div className="card">
      <div className="card-header">{user ? user.name : <Skeleton short />}</div>
      <div className="card-body">
        {user ? <div>{user?.company.name}</div> : <Skeleton short />}
        {user ? <div>{user?.website}</div> : <Skeleton short />}
        {user ? <div>{user?.email}</div> : <Skeleton short />}
      </div>
      <div className="card-footer">
        {user ? (
          <Link className="btn" to={user?.id.toString() || '#'}>
            View
          </Link>
        ) : (
          <SkeletonButton />
        )}
      </div>
    </div>
  );
};

const UserList = () => {
  const { usersPromise } = useLoaderData() as { usersPromise: Promise<UserType[]> };

  return (
    <>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList length={10}>
              <UserCard />
            </SkeletonList>
          }
        >
          <Await resolve={usersPromise}>
            {(users: UserType[]) => users.map(user => <UserCard key={user.id} user={user} />)}
          </Await>
        </Suspense>
      </div>
    </>
  );
};

const userListLoader = async ({ request: { signal } }: { request: { signal: AbortSignal } }) => {
  return defer({ usersPromise: getUsers({ signal }) });
};

export const userListRoute = {
  element: <UserList />,
  loader: userListLoader,
};
