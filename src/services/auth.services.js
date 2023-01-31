import { axiosInstanceNoAuth } from "constants/axiosInstance";
import globalConfig from "config/global.config";

const AuthenticationServices = () => {
  const signIn = async (email, password) => {
    const response = await axiosInstanceNoAuth.post(
      "login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  };

  return {
    signIn,
  };
};

export default AuthenticationServices;
