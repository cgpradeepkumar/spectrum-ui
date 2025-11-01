import React, { useState } from 'react';
import './UploadForm.css';

/**
 * A reusable component for selecting a file and submitting it.
 * @param {function} onSubmit - Callback function that receives the selected File object.
 * @param {boolean} isLoading - State to disable the button during submission.
 */
const UploadForm = ({ onSubmit, isLoading }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    // Only allow single file selection
    setFile(event.target.files[0] || null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file && onSubmit && !isLoading) {
      onSubmit(file);
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-header">Generate Flashcards from File</h2>
      <p className="upload-instruction">Upload your document (e.g., PDF, TXT) to automatically generate a flashcard deck.</p>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <label htmlFor="file-upload" className={`file-label ${file ? 'file-selected' : ''}`}>
          {file ? file.name : 'Choose File...'}
        </label>
        <input 
          id="file-upload" 
          type="file" 
          onChange={handleFileChange} 
          className="file-input" 
          accept=".pdf,.txt,.docx" // Restrict file types
        />
        
        <button 
          type="submit" 
          disabled={!file || isLoading} 
          className="submit-button"
        >
          {isLoading ? 'Generating Cards...' : 'Create Deck'}
        </button>
        
        {isLoading && <p className="loading-message">This may take a moment...</p>}
      </form>
    </div>
  );
};

export default UploadForm;
