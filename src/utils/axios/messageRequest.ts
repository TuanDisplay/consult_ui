import axios from "axios";

const messageRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_MESSAGE,
});

messageRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

export const get = async (path: string, options = {}) => {
  const response = await messageRequest.get(path, options);
  return response.data;
};

export const post = async (path: string, data = {}, options = {}) => {
  const response = await messageRequest.post(path, data, options);
  return response.data;
};

export const put = async (path: string, data = {}, options = {}) => {
  const response = await messageRequest.put(path, data, options);
  return response.data;
};


export default messageRequest;