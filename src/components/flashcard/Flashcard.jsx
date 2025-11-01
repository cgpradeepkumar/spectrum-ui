import React, { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ card }) => {
  // Use internal state for the flip, as it's purely UI/presentational
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container" onClick={flipCard}>
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        <div className="flashcard-face flashcard-front">
          <p className="card-text">{card.front}</p>
          <p className="card-hint">Tap to see the answer</p>
        </div>
        <div className="flashcard-face flashcard-back">
          <p className="card-text">{card.back}</p>
          <p className="card-hint">Tap to see the question</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;