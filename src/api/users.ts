import { baseApi } from './base';
import { UserType } from '../types';

export const getUsers = async (options: { signal: AbortSignal }): Promise<UserType[]> => {
  const response = await baseApi.get('users', options);
  return response.data;
};

export const getUser = async (id: string, options: { signal: AbortSignal }): Promise<UserType> => {
  const response = await baseApi.get(`users/${id}`, options);
  return response.data;
};
