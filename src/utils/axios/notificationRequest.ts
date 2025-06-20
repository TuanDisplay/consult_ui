import axios from "axios";

const notificationRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_NOTIFICATION,
});

notificationRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("consultToken");
  if (token) {
    config.headers["x-token"] = token;
  }
  return config;
});

export const get = async (path: string, options = {}) => {
  const response = await notificationRequest.get(path, options);
  return response.data;
};

export const post = async (path: string, data = {}, options = {}) => {
  const response = await notificationRequest.post(path, data, options);
  return response.data;
};

export const put = async (path: string, data = {}, options = {}) => {
  const response = await notificationRequest.put(path, data, options);
  return response.data;
};

export default notificationRequest;
