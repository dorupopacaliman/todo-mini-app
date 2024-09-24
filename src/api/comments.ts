import { baseApi } from './base';

export const getComments = async (postId, options) => {
  const response = await baseApi.get(`posts/${postId}/comments`, options);
  return response.data;
};

