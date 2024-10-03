import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../routes';

export const renderRoute = (route = '/') => {
  const router = createMemoryRouter(routes, {
    initialEntries: [{ pathname: route }],
  });
  return render(<RouterProvider router={router} />);
};
