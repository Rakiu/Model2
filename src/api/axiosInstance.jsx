import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const timeout = Number(import.meta.env.VITE_TIMEOUT);

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: timeout,
  headers: {
    "Content-Type": "application/json",
  },
});


const authExcludedPaths = ["/api/admin/login"];

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // exclude login API from token requirement
    const isExcluded = authExcludedPaths.some((path) =>
      config.url?.includes(path)
    );

    if (!isExcluded) {
      const token = localStorage.getItem("tokenId");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
