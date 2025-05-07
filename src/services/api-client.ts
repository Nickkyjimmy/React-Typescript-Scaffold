import axios from "axios"
import { getToken } from "./auth-service"

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // Get the token before each request
    const token = await getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // If the error is due to an expired token and we haven't tried to refresh yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Refresh token logic would go here
        // const newToken = await refreshToken()
        // Update the request with the new token
        // originalRequest.headers.Authorization = `Bearer ${newToken}`

        // Return the request with the new token
        return apiClient(originalRequest)
      } catch (refreshError) {
        // If refreshing fails, redirect to login
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient
