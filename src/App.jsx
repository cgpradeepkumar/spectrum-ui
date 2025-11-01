import React from 'react';
import DeckPage from './pages/deck/DeckPage';
import './styles/App.css'; // Global styling

// This is the main router component (for a simple app, it just renders the page)
const App = () => {
  // In a multi-page app, this is where you'd add React Router logic:
  // return <BrowserRouter><Routes><Route path="/" element={<DeckPage />} /></Routes></BrowserRouter>
  
  return (
    <div className="app-container">
      <DeckPage />
    </div>
  );
};

export default App;