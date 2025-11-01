import axios from 'axios';

// Define the base URL for your REST endpoint. 
// It's best practice to use an environment variable for this.
const FLASHCARD_API_BASE_URL = import.meta.env.SPECTRUM_API_URL || 'http://34.9.68.247:8080/ai-server/api/flashcards';

/**
 * Configures and exports a pre-configured Axios instance.
 * All API calls across the application will use this client.
 */
const apiClient = axios.create({
    baseURL: FLASHCARD_API_BASE_URL,
    timeout: 30000, // 10 seconds timeout
    headers: {
        // REMOVED 'Content-Type': 'application/json' 
        // Axios will automatically set the correct header (e.g., multipart/form-data) 
        // based on the data being sent (e.g., FormData).

        // Add any necessary authorization tokens here, usually handled via interceptors
        // 'Authorization': `Bearer ${token}`, 
    },
});

// Optional: Add a response interceptor to handle global errors (e.g., 401 Unauthorized)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Example: Log or handle specific global error statuses
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Redirecting to login...');
            // In a real app, you might trigger a log-out action here.
        }
        return Promise.reject(error);
    }
);

export default apiClient;
