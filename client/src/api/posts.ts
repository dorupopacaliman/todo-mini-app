import { PostFormType, PostType } from '../types';
import { baseApi } from './base';

export const getPosts = async (
  { signal, params }: { signal: AbortSignal; params: { q: string | null; userId: string | null } }
): Promise<PostType[]> => {
  const response = await baseApi.get('posts', {
    signal,
    params: {
      ...params,
    },
  });
  return response.data;
};

export const getPost = async (id: string, options: { signal: AbortSignal }): Promise<PostType> => {
  const response = await baseApi.get(`posts/${id}`, options);
  return response.data;
};

export const getUserPosts = async (userId: string, options: { signal: AbortSignal }): Promise<PostType[]> => {
  const response = await baseApi.get(`posts?userId=${userId}`, options);
  return response.data;
};

export const addPost = async (post: PostFormType, options: { signal: AbortSignal }): Promise<PostType> => {
  const response = await baseApi.post('posts', post, options);
  return response.data;
};

export const updatePost = async (
  id: string,
  post: PostFormType,
  options: { signal: AbortSignal }
): Promise<PostType> => {
  const response = await baseApi.put(`posts/${id}`, post, options);
  return response.data;
};
