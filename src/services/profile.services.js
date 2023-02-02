import { axiosInstance } from "constants/axiosInstance";

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
