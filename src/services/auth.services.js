import axios from "axios";
import globalConfig from "config/global.config";
import LocalStorageUtils from "utils/localStorageUtils";

const API_URL = globalConfig.development.api_url;

const signIn = async (email, password) => {
  const response = await axios.post(`${API_URL}login`, {
    email,
    password,
  });
  if (response.data.token) {
    LocalStorageUtils.setToken(response.data.token);
  }
  return response.data;
};

export { signIn };
