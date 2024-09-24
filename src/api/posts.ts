import { baseApi } from './base';

export const getPosts = async (options: { signal: AbortSignal }) => {
  const response = await baseApi.get('posts', options);
  return response.data;
};

export const getPost = async (id: string, options: { signal: AbortSignal }) => {
  const response = await baseApi.get(`posts/${id}`, options);
  return response.data;
};

export const getUserPosts = async (userId: string, options: { signal: AbortSignal }) => {
  const response = await baseApi.get(`posts?userId=${userId}`, options);
  return response.data;
};
