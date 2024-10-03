import { DefaultBodyType, http, HttpResponseResolver, PathParams } from 'msw';
import { setupServer } from 'msw/node';

export const mockServer = setupServer();

export const addMockApiRouteHandler = (
  type: 'get' | 'post' | 'put' | 'delete',
  path: string,
  cb: HttpResponseResolver<PathParams, DefaultBodyType, undefined>
) => {
  mockServer.use(http[type](new URL(path, import.meta.env.VITE_API_URL).href, cb));
};
