import axios from "axios";
import LocalStorageUtils from "utils/localStorageUtils";

const axiosInstance = axios.create({
  baseURL: "https://work-team-manager.vercel.app/",
  headers: {

    


    

  },
});

const axiosInstanceNoAuth = axios.create({
  baseURL: "https://work-team-manager.vercel.app/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = LocalStorageUtils.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance, axiosInstanceNoAuth };
