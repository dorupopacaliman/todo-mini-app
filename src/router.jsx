import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Error from './pages/Error';
import { postRoute } from './pages/Post';
import { postListRoute } from './pages/PostList';
import { newTodoRoute } from './pages/NewTodo';
import { todoListRoute } from './pages/TodoList';
import { userRoute } from './pages/User';
import { userListRoute } from './pages/UserList';


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
            path: 'new',
            ...newTodoRoute,
          },
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
