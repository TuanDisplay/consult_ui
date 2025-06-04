import axios from "axios";

const customerRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_CUSTOMER,
});

customerRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem('consultToken');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

export const get = async (path: string, options = {}) => {
  const response = await customerRequest.get(path, options);
  return response.data;
};

export const post = async (path: string, data = {}, options = {}) => {
  const response = await customerRequest.post(path, data, options);
  return response.data;
};

export const put = async (path: string, data = {}, options = {}) => {
  const response = await customerRequest.put(path, data, options);
  return response.data;
};


export default customerRequest;