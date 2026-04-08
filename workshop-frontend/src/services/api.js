import axios from "axios";

const API_BASE_URL =
    // Changing base URL to match the backend server's address and port
    import.meta.env.VITE_API_URL || "http://localhost:8000/workshop";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true // session cookie
});

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Only redirect if not already on public pages
            const publicPages = ["/login", "/register"];
            if (!publicPages.some(p => window.location.pathname === p)) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    },
);

export default api;
