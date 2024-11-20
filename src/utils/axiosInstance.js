import axios from "axios";
import { BASE_URL } from "./constant";

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: "https://notes-app-backend-9bww.onrender.com",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        
    }
});

// Add a request interceptor to attach the access token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token'); // Get token from local storage
        if (accessToken) {
            // Add token to Authorization header with correct format
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;  // Proceed with the request
    },
    (error) => {
        // Handle errors in request setup
        return Promise.reject(error);
    }
);

export default axiosInstance;

