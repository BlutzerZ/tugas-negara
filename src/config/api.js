export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  ENDPOINTS: {
    AUTH: {
      SIGNIN: import.meta.env.VITE_API_AUTH_SIGNIN,
      SIGNUP: import.meta.env.VITE_API_AUTH_SIGNUP,
    },
    USER: {
      PROFILE: import.meta.env.VITE_API_USER,
      LIST: import.meta.env.VITE_API_USERS,
      STORES: import.meta.env.VITE_API_USER_STORES,
      STOCK: import.meta.env.VITE_API_USER_STOCK, // New endpoint
      STOCK_DETAIL: import.meta.env.VITE_API_USER_STOCK_DETAIL, // New endpoint
    },
    STORES: {
      LIST: import.meta.env.VITE_API_STORES,
      DETAIL: import.meta.env.VITE_API_STORE_DETAIL,
    },
    INFO: import.meta.env.VITE_API_INFO,
  },
  HEADERS: {
    "Content-Type": import.meta.env.VITE_API_CONTENT_TYPE,
  },
};

export const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  "Content-Type": import.meta.env.VITE_API_CONTENT_TYPE,
});

export const createApiUrl = (endpoint, params = {}) => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;

  // Replace path parameters
  Object.keys(params).forEach((key) => {
    url = url.replace(`:${key}`, params[key]);
  });

  return url;
};
