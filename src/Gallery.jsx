import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import './Media.css';
import initialData from './Json Files/Media.json';
import Footer from './Components/Footer';

function Media() {
  const [siteData, setSiteData] = useState(initialData);

  useEffect(() => {
    const saved = localStorage.getItem('kpr_site_data');
    if (saved) setSiteData(JSON.parse(saved));
  }, []);

  const mediaData = siteData.media;

  return (
    <div className="media-page-wrapper">
      <Navbar />
      
      <div className="media-container" style={{ marginTop: '80px' }}>
        <header className="media-hero">
          <h1 className="ornate-title">{mediaData.title}</h1>
          <span className="arabic-text">{mediaData.arabicSymbol}</span>
          <div className="title-divider"></div>
        </header>

        <main className="masonry-layout">
          {mediaData.tiles.map((tile, index) => (
            <div className={`masonry-item ${tile.type}`} key={index}>
              <div className="ornate-frame">
                <div className="inner-content">
                  
                  {/* VIDEO TILE LOGIC */}
                  {tile.type === 'video-tile' && (
                    <>
                      <img src={tile.image} alt="Thumbnail" className="bg-blur" />
                      <div className="play-overlay"><div className="play-icon"></div></div>
                    </>
                  )}

                  {/* VERTICAL CALLIGRAPHY LOGIC */}
                  {tile.type === 'vertical-tile' && (
                    <div className="calligraphy-bg">
                      <p className="frame-text">{tile.text}</p>
                      <div className="gold-seal"></div>
                    </div>
                  )}

                  {/* IMAGE TILES (SQUARE) */}
                  {tile.type === 'square-tile' && (
                    <img src={tile.image} alt="Gallery" />
                  )}

                  {/* QUOTE TILE (HORIZONTAL) */}
                  {tile.type === 'horizontal-tile' && (
                    <div className="flex-center">
                      <p className="sufi-quote">"{tile.quote}"</p>
                    </div>
                  )}

                </div>
              </div>
              
            </div>
            
          ))}
        </main>
        
      </div>
                <Footer/>

    </div>
  );
}

export default Media;