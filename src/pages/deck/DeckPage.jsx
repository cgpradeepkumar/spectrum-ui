import React from 'react';
import FlashcardDeck from '../../features/flashcard/FlashcardDeck';

const DeckPage = () => {
  return (
    <div className="deck-page">
      <header className="app-header">
        <h1>Web Flashcards App 📚</h1>
      </header>
      <main className="main-content">
        <FlashcardDeck />
      </main>
    </div>
  );
};

export default DeckPage;