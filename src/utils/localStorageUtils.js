const LocalStorageUtils = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  setToken: (token) => {
    localStorage.setItem("token", JSON.stringify(token));
  },

  setRefreshToken: (refreshToken) => {
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
  },

  getToken: () => {
    return JSON.parse(localStorage.getItem("token"));
  },

  getRefreshToken: () => {
    return JSON.parse(localStorage.getItem("refreshToken"));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};

export default LocalStorageUtils;
