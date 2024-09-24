import { baseApi } from './base';

export const getUsers = async options => {
  const response = await baseApi.get('users', options);
  return response.data;
};

export const getUser = async (id, options) => {
  const response = await baseApi.get(`users/${id}`, options);
  return response.data;
};
