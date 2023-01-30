import axios from "axios";
import config from "config/global.config";
import jwtUtils from "utils/jwtUtils";
import LocalStorageUtils from "utils/localStorageUtils";
import { useDispatch } from "react-redux";

const API_URL = config.development.api_url;

const ProfileServices = () => {
  const getPersonalInfo = async () => {
  }

  return {
    getPersonalInfo
  }

}

export default ProfileServices;