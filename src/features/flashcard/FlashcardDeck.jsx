import React, { useState } from 'react';
import Flashcard from '../../components/flashcard/Flashcard';
// 1. Import the new UploadForm component
import UploadForm from '../../components/ui/UploadForm'; 
import { generateFlashcardsFromFile } from './flashcardAPI';
import './FlashcardDeck.css';

const FlashcardDeck = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Function to handle the file submission from the UploadForm
  const handleFileUpload = async (file) => {
    setIsLoading(true);
    setError(null);
    setFlashcards([]); // Clear previous cards
    setCurrentIndex(0);

    try {
      const data = await generateFlashcardsFromFile(file);
      if (data && data.length > 0) {
        setFlashcards(data);
      } else {
        setError("The API returned no flashcards. Please ensure your file content is valid.");
      }
    } catch (err) {
      // The API function already throws a user-friendly error
      setError(err.message || "An unknown error occurred during card generation.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigation logic
  const hasCards = flashcards.length > 0;
  const currentCard = hasCards ? flashcards[currentIndex] : null;

  const nextCard = () => {
    if (hasCards) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    }
  };

  const prevCard = () => {
    if (hasCards) {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
      );
    }
  };

  // 3. Conditional Rendering Logic (The core change)
  let content;

  if (isLoading) {
    content = <div className="loading-message">Generating flashcards...</div>;
  } else if (error) {
    content = (
      <div className="error-container">
        <div className="error-message">{error}</div>
        {/* Allows user to reset and try again */}
        <button onClick={() => setError(null)} className="nav-button retry-button">
            Try Another File
        </button>
      </div>
    );
  } else if (!hasCards) {
    // Show the Upload Form if no cards have been loaded yet
    content = <UploadForm onSubmit={handleFileUpload} isSubmitting={isLoading} />;
  } else {
    // Show the Flashcard Deck
    content = (
      <>
        <p className="card-counter">
          Card {currentIndex + 1} of {flashcards.length}
        </p>
        
        <Flashcard 
            key={currentCard.front} 
            card={currentCard} 
        />
        
        <div className="navigation-controls">
          <button onClick={prevCard} className="nav-button prev-button">
            &larr; Previous
          </button>
          <button onClick={nextCard} className="nav-button next-button">
            Next &rarr;
          </button>
        </div>

        <div className='navigation-controls'>
        {/* Option to upload a new deck */}
        <button onClick={() => setFlashcards([])} className="nav-button upload-new-button">
            Upload New File
        </button>
        </div>
      </>
    );
  }

  return (
    <div className="flashcard-deck">
      {content}
    </div>
  );
};

export default FlashcardDeck;
