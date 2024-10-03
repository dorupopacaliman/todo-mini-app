import { baseApi } from './base';

export const getTodos = async ({ signal, query }: { signal: AbortSignal; query: string | null }) => {
  const response = await baseApi.get('todos', {
    signal,
    params: {
      q: query,
    },
  });
  return { todos: response.data, query };
};

export const addTodo = async ({ title, signal }: { title: FormDataEntryValue | null; signal: AbortSignal }) => {
  const response = await baseApi.post('todos', { title, completed: false }, { signal });
  return response.data.body;
};

export const getUserTodos = async (userId: string, { signal }: { signal: AbortSignal }) => {
  const response = await baseApi.get(`todos?userId=${userId}`, {
    signal,
  });
  return response.data;
};
