import axios from "axios";
import LocalStorageUtils from "utils/localStorageUtils";

const axiosInstance = axios.create({
  baseURL: "https://work-team-manager.vercel.app/",
  headers: {
    Authorization: `Bearer ${LocalStorageUtils.getToken()}`,
  },
});

const axiosInstanceNoAuth = axios.create({
  baseURL: "https://work-team-manager.vercel.app/",
});

const requestInterceptor = (config) => {
  const token = LocalStorageUtils.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const responseInterceptor = (response) => {
  return response;
};

axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor);

export { axiosInstance, axiosInstanceNoAuth };
