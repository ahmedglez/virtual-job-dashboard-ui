import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://work-team-manager.vercel.app/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default axiosInstance;
