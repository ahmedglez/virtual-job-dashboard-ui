import env from "react-dotenv";
import React from "react";

const globalConfig = () => {
  const development = {
    API_URL: env.API_URL,
  };
  return {
    development,
  };
};

export default globalConfig;
