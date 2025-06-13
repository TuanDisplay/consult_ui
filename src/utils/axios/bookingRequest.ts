import axios from "axios";

const bookingRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_BOOKING,
});

bookingRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("consultToken");
  if (token) {
    config.headers["x-token"] = token;
  }
  return config;
});

export const get = async (path: string, options = {}) => {
  const response = await bookingRequest.get(path, options);
  return response.data;
};

export const post = async (path: string, data = {}, options = {}) => {
  const response = await bookingRequest.post(path, data, options);
  return response.data;
};

export const put = async (path: string, data = {}, options = {}) => {
  const response = await bookingRequest.put(path, data, options);
  return response.data;
};

export default bookingRequest;
