import axios from 'axios';

const expertRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_EXPERT,
});

expertRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

export const get = async (path: string, options = {}) => {
  const response = await expertRequest.get(path, options);
  return response.data;
};

export const post = async (path: string, data = {}, options = {}) => {
  const response = await expertRequest.post(path, data, options);
  return response.data;
};

export default expertRequest;
