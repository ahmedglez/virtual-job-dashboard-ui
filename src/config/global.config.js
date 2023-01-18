require("dotenv").config();

module.exports = {
  development: {
    api_url: process.env.API_URL,
    login_url: process.env.LOGIN_URL,
    logout_url: process.env.LOGOUT_URL,
  },
};
