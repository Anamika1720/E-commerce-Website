import axios from "axios";
import { API_TIME_OUT, BASE_URL } from "./http.config";

// Create an axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: API_TIME_OUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getRequest = (url, params = {}, config = {}) => {
  return axiosInstance.get(url, { params, ...config });
};

export const postRequest = (url, data = {}, config = {}) => {
  return axiosInstance.post(url, data, config);
};

export const putRequest = (url, data = {}, config = {}) => {
  return axiosInstance.put(url, data, config);
};

export const patchRequest = (url, data = {}, config = {}) => {
  return axiosInstance.patch(url, data, config);
};

export const deleteRequest = (url, config = {}) => {
  return axiosInstance.delete(url, config);
};
