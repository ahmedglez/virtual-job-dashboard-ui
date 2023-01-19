import axios from "axios";
import globalConfig from "../config/global.config.js";

const email = "ahmediglez@gmail.com";
const password = "admin1234";

const login = async (email, password) => {
  const API_URL = globalConfig.development.api_url;
  const response = await axios.post(API_URL + "login", {
    email,
    password,
  });
  console.log(response.data);
  return response.data;
};

login(email, password)
