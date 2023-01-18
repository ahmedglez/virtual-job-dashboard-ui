import axios from "axios";
import config from "config/global.config";
import jwtUtils from "utils/jwtUtils";
import LocalStorageUtils from "utils/localStorageUtils";
import { Connect, useDispatch } from "react-redux";
import profileServices from "./profile.services";
import { useHistory } from "react-router-dom";

const API_URL = config.development.api_url;
var dispatch = useDispatch();


class AuthService {
  constructor() {}

  async signIn(username, password) {
    const history = useHistory();
    const response = await axios.post(API_URL + "login", {
      username,
      password,
    });
    if (response.status === 200) {
      LocalStorageUtils.setItem("token", response.data.token);
      LocalStorageUtils.setItem("refreshToken", response.data.refreshToken);
      const user = await profileServices.getUserProfile();
      dispatch({
        type: "SET_LOGIN_SUCCESS",
        payload: {
          user: user,
          token: response.data.token,
          refreshToken: response.data.refreshToken,
          logoutAt: jwtUtils.getLogoutAt(response.data.token),
        },
      });
      history.push("/dashboard");
    } else {
      dispatch({
        type: "SET_LOGIN_FAIL",
        payload: {
          error: response.data.message,
        },
      });
    }
    return response.data;
  }
}

export default new AuthService();
