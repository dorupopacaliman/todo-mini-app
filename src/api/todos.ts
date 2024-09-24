import { baseApi } from './base';

export const getTodos = async ({ signal }: { signal: AbortSignal }) => {
  const response = await baseApi.get('todos', {
    signal,
  });
  return response.data;
};

export const getUserTodos = async (userId: string, { signal }: { signal: AbortSignal }) => {
  const response = await baseApi.get(`todos?userId=${userId}`, {
    signal,
  });
  return response.data;
};
