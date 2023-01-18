import jwt from "jsonwebtoken";

const getExpirationTime = (token) => {
  const decoded = jwt.decode(token);
  return decoded.exp;
};

const isTokenExpired = (token) => {
  const expirationTime = getExpirationTime(token);
  return Date.now() >= expirationTime * 1000;
};

const isTokenValid = (token) => {
  return token && !isTokenExpired(token);
};

const getPayload = (token) => {
  return jwt.decode(token);
};

export default {
  isTokenValid,
  isTokenExpired,
  getExpirationTime,
  getPayload,
};
