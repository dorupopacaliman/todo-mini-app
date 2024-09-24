import { baseApi } from './base';

export const getUsers = async (options: { signal: AbortSignal }) => {
  const response = await baseApi.get('users', options);
  return response.data;
};

export const getUser = async (id: string, options: { signal: AbortSignal }) => {
  const response = await baseApi.get(`users/${id}`, options);
  return response.data;
};
