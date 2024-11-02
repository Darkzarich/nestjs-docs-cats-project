import axios from 'axios';
import { useUserStore } from '../stores/user.store';

export const ApiClient = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:3000' : '',
});

ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { clearUser } = useUserStore.getState();

      clearUser();
    }

    return Promise.reject(error);
  },
);

ApiClient.interceptors.request.use(
  (config) => {
    const { user } = useUserStore.getState();

    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
