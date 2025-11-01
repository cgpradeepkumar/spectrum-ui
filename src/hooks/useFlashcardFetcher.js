import { useState, useEffect } from 'react';
import { fetchFlashcards } from '../features/flashcard/flashcardAPI';

/**
 * Custom hook to fetch flashcards data from the API.
 * @returns {object} { flashcards, isLoading, error }
 */
const useFlashcardFetcher = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCards = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await fetchFlashcards();
                setFlashcards(data);
            } catch (err) {
                console.error("Flashcard API Error:", err);
                setError("Failed to load flashcards. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        loadCards();
    }, []);

    return { flashcards, isLoading, error };
};

export default useFlashcardFetcher;