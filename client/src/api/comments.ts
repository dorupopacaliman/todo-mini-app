import { baseApi } from './base';

export const getComments = async (postId: string, options: { signal: AbortSignal }) => {
  const response = await baseApi.get(`posts/${postId}/comments`, options);
  return response.data;
};

