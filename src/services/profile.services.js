import axios from "axios";
import config from "config/global.config";
import jwtUtils from "utils/jwtUtils";
import LocalStorageUtils from "utils/localStorageUtils";
import { useDispatch } from "react-redux";

const API_URL = config.development.api_url;

class ProfileService {
  constructor() {}

  async getUserProfile() {
    const dispatch = useDispatch();
    const response = await axios.get(API_URL + "me", {
      headers: {
        Authorization: "Bearer " + LocalStorageUtils.getItem("token"),
      },
    });
    if (response.status === 200) {
      const payload = {
        isAuthenticated: true,
        user: response.data,
      };
      dispatch({
        type: "SET_LOGIN_SUCCESS",
        payload: payload,
      });
    }
    return response.data;
  }
}

export default new ProfileService();
