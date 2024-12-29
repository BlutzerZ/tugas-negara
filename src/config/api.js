export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  ENDPOINTS: {
    AUTH: {
      SIGNIN: import.meta.env.VITE_API_AUTH_SIGNIN,
      SIGNUP: import.meta.env.VITE_API_AUTH_SIGNUP,
    },
    USER: {
      PROFILE: import.meta.env.VITE_API_USER,
      PROFILE_PHOTO: import.meta.env.VITE_API_USER_PHOTO,
      LIST: import.meta.env.VITE_API_USERS,
      STORES: import.meta.env.VITE_API_USER_STORES,
      STOCK: import.meta.env.VITE_API_USER_STOCK,
      STOCK_DETAIL: import.meta.env.VITE_API_USER_STOCK_DETAIL,
      STOCK_RETURN: import.meta.env.VITE_API_USER_STOCK_RETURN,
      STOCK_DETAIL_RETURN: import.meta.env.VITE_API_USER_STOCK_DETAIL_RETURN,
      STOCK_REDUCE: import.meta.env.VITE_API_USER_STOCK_REDUCE,
      STOCK_DETAIL_REDUCE: import.meta.env.VITE_API_USER_STOCK_DETAIL_REDUCE,

      STOCK_RETURN_LOG: import.meta.env.VITE_API_USER_STOCK_RETURN_LOG,
      STOCK_RETURN_LOG_LATEST: import.meta.env
        .VITE_API_USER_STOCK_RETURN_LOG_LATEST,
      STOCK_SOLD_LOG: import.meta.env.VITE_API_USER_STOCK_SOLD_LOG,
      STOCK_SOLD_LOG_LATEST: import.meta.env
        .VITE_API_USER_STOCK_SOLD_LOG_LATEST,
    },
    STORES: {
      LIST: import.meta.env.VITE_API_STORES,
      DETAIL: import.meta.env.VITE_API_STORE_DETAIL,
    },
    INFO: import.meta.env.VITE_API_INFO,
    USERSTOCK: import.meta.env.VITE_API_SALES_STOCK,
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
