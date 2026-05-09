import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: '/api',
  timeout: 8000,
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    if (err.response?.status === 403) {
      toast.error('Access Denied: You do not have permission for this action.');
    }
    return Promise.reject(err);
  }
);

export default api;
