import axios from 'axios';

const api = axios.create({
  // Crucial: Add /api to the end of your baseURL
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// Interceptor to attach the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper for CSRF (Sanctum)
// Note: sanctum/csrf-cookie is usually NOT under the /api prefix, 
// so we use a full path or a separate instance.
export const getCsrfToken = () =>
  axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true });

export default api;