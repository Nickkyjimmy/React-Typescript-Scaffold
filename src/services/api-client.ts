import axios from "axios";


const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Send cookies along with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor: handle 401 and retry logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry // prevent infinite loop
    ) {
      originalRequest._retry = true;

      try {
        // If using refresh token flow, call it here
        // const newToken = await refreshAccessToken();
        // storeNewToken(newToken);
        // originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Retry original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Redirect if token refresh fails
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
