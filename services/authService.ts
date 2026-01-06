
import api, { getCsrfToken } from './api';

export const authApi = {
  login: async (credentials: any) => {
    await getCsrfToken();
    return api.post('/login', credentials);
  },
  register: async (userData: any) => {
    await getCsrfToken();
    return api.post('/register', userData);
  },
  logout: () => api.post('/logout'),
  getUser: () => api.get('/api/user'),
};
