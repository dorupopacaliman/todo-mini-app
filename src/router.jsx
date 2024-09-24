import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import { postListRoute } from './pages/PostList';
import { userListRoute } from './pages/UserList';
import { todoListRoute } from './pages/TodoList';
import { postRoute } from './pages/Post';
import { userRoute } from './pages/User';
import Error from './pages/Error';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        errorElement: <Error />,
        children: [
          { index: true, element: <Navigate to="posts" /> },
          {
            path: 'posts',
            children: [
              {
                index: true,
                ...postListRoute,
              },
              { path: ':id', ...postRoute },
            ],
          },
          {
            path: 'users',
            children: [
              {
                index: true,
                ...userListRoute,
              },
              { path: ':id', ...userRoute },
            ],
          },
          {
            path: 'todos',
            ...todoListRoute,
          },
          { path: '*', element: <h1>404 - Page not found</h1> },
        ],
      },
    ],
  },
]);

