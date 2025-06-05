import axios from "axios";

const ratingRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_RATING,
});

ratingRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("consultToken");
  if (token) {
    config.headers["x-token"] = token;
  }
  return config;
});

export const get = async (path: string, options = {}) => {
  const response = await ratingRequest.get(path, options);
  return response.data;
};

export const post = async (path: string, data = {}, options = {}) => {
  const response = await ratingRequest.post(path, data, options);
  return response.data;
};

export const put = async (path: string, data = {}, options = {}) => {
  const response = await ratingRequest.put(path, data, options);
  return response.data;
};

export default ratingRequest;
