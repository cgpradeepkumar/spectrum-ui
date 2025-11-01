import apiClient from '../../api/apiClient'; // Assuming apiClient is exported from apiClient.js

/**
 * Uploads a file to the API to generate flashcards.
 * It sends the file via POST request using FormData.
 * * @param {File} file The file object to upload.
 * @returns {Promise<Array<{front: string, back: string}>>} A promise that resolves to the array of flashcards.
 */
export const generateFlashcardsFromFile = async (file) => {
    // 1. Prepare the data for upload
    const formData = new FormData();
    // 'file' must match the field name your REST endpoint expects for the uploaded file
    formData.append('file', file);

    try {
        // 2. Make the POST request. 
        // The base URL (http://.../api/flashcards) is set in axiosConfig.js.
        // The resource path '/generate' makes the final URL: .../api/flashcards/generate
        const response = await apiClient.post('/generate', formData);

        // 3. Validate and return the data
        if (response.data && Array.isArray(response.data)) {
            return response.data;
        } else {
            // API returned data but in the wrong format (not an array)
            throw new Error("The API returned data in an invalid format. Expected an array of flashcards.");
        }
    } catch (error) {
        // 4. Centralized and user-friendly error handling

        let errorMessage = 'Could not generate flashcards from the file.';

        if (error.code === 'ERR_NETWORK' || error.message.includes('timeout')) {
            // General network failure, timeout, or (most commonly) CORS issue
            errorMessage = 'Network error: Please check your connection or API server status.';

        } else if (error.response) {
            // Server responded with an error status (4xx or 5xx)
            const status = error.response.status;
            // Try to use a message from the server's response body, or default to status code
            const serverMessage = error.response.data?.message || error.response.data || `Server responded with status ${status}.`;

            if (status === 404) {
                errorMessage = "The API endpoint was not found. Please verify the resource path: /generate";
            } else {
                errorMessage = `Card generation failed: ${serverMessage}`;
            }
        }

        // Log the detailed error for debugging purposes
        console.error("Error generating flashcards from file:", error);

        // Throw the user-friendly message for the UI to catch and display
        throw new Error(errorMessage);
    }
};

// We remove the mock data and the old fetchFlashcards function here.
