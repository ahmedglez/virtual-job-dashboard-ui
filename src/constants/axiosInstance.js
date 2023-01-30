import axios from "axios";
import LocalStorageUtils from "utils/localStorageUtils";

const axiosInstance = axios.create({
  baseURL: "https://work-team-manager.vercel.app/",
  headers: {
    Authorization: `Bearer ${LocalStorageUtils.getToken()}`,
  },
});

export default axiosInstance;
