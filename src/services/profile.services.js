import axiosInstance from "constants/axiosInstance";
import config from "config/global.config";
import jwtUtils from "utils/jwtUtils";
import LocalStorageUtils from "utils/localStorageUtils";
import { useDispatch } from "react-redux";

const API_URL = config.development.api_url;

const ProfileServices = () => {
  const getPersonalInfo = async () => {
    try {
      const response = await axiosInstance.get("me");
      if (response.status === 200) {
        const { data } = response;
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getPersonalInfo,
  };
};

export default ProfileServices;
