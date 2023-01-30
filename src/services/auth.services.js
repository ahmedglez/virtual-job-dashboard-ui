import axiosInstance  from "constants/axiosInstance";
import globalConfig from "config/global.config";

const axios = axiosInstance;


const AuthenticationServices = () => {
  const signIn = async (email, password) => {
    const response = await axios.post("login", {
      email,
      password,
    });   
    return response.data;
  };

  return {
    signIn,
  };
};

export default AuthenticationServices;
