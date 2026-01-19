import React from 'react';
import './Kalaams.css';

function KalaamDetails({ kalaam, onBack }) {
  if (!kalaam) return null;

  return (
    <div className="kalaam-details-page">
      <div className="container lyrics-container">
        

        <header className="lyrics-header">
          <h1 className="kalaam-details-title">{kalaam.title}</h1>
          <p className="kalaam-poet-subtitle">{kalaam.poet || "Kalaam"}</p>
          <div className="title-divider"></div>
        </header>

        <div className="kalaam-lines">
          {kalaam.lines
            ? kalaam.lines.split('\n').map((line, idx) => (
                <p key={idx} className="kalaam-line">
                  {line.trim()}
                </p>
              ))
            : <p className="no-lines">Lyrics coming soon...</p>}
        </div>
      </div>
      <button className="back-button" onClick={onBack}>
          <span className="back-arrow">←</span> Back to Library
        </button>
    </div>
  );
}

export default KalaamDetails;