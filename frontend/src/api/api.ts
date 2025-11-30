import axios from 'axios';
import { useAuthStore } from '@/shared/auth/AuthStore.ts';

const $api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

$api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      const authStore = useAuthStore();
      try {
        originalRequest._isRetry = true;
        await authStore.refreshToken();
        return await $api.request(originalRequest);
      } catch {
        throw error;
      }
    }
    throw error;
  }
);

export default $api;
