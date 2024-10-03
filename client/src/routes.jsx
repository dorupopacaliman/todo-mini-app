import { Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Error from './pages/Error';
import { newPostRouter } from './pages/NewPost';
import { editPostRouter } from './pages/EditPost';
import { newTodoRoute } from './pages/NewTodo';
import { postRoute } from './pages/Post';
import { postListRoute } from './pages/PostList';
import { todoListRoute } from './pages/TodoList';
import { userRoute } from './pages/User';
import { userListRoute } from './pages/UserList';

export const routes = [
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
              { path: 'new', ...newPostRouter },
              {
                path: ':id',
                children: [
                  { index: true, ...postRoute },
                  { path: 'edit', ...editPostRouter },
                ],
              },
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
            children: [
              {
                index: true,
                ...todoListRoute,
              },
              {
                path: 'new',
                ...newTodoRoute,
              },
            ],
          },
          { path: '*', element: <h1>404 - Page not found</h1> },
        ],
      },
    ],
  },
];
