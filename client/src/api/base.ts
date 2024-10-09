import axios from 'axios';

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

if (import.meta.env.VITE_SLOW_API === 'true') {
  baseApi.interceptors.request.use((config) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(config), 100);
    });
  });
}
