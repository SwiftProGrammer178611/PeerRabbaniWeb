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
    <div className="media-page-wrapper pt-16">
      <Navbar />

      <div className="media-container" style={{ marginTop: '80px' }}>
        <header className="media-hero">
          <h1 className="main-title">Gallery</h1>
          <div className="title-divider"></div>
        </header>

        <main className="masonry-layout">
          {mediaData.tiles.map((tile, index) => (
            <div className={`masonry-item ${tile.type}`} key={index}>
              <div className="ornate-frame">

                {/* 🔥 BACKGROUND IMAGE IS SET HERE */}
                <div
                  className="inner-content"
                  style={
                    tile.image
                      ? { backgroundImage: `url(${tile.image})` }
                      : {}
                  }
                >

                  {/* VIDEO TILE */}
                  {tile.type === 'video-tile' && (
                    <>
                      <img src={tile.image} alt="Thumbnail" />
                      <div className="play-overlay">
                        <div className="play-icon"></div>
                      </div>
                    </>
                  )}

                  {/* VERTICAL CALLIGRAPHY */}
                  {tile.type === 'vertical-tile' && (
                    <div className="calligraphy-bg">
                      <p className="frame-text">{tile.text}</p>
                      <div className="gold-seal"></div>
                    </div>
                  )}

                  {/* IMAGE TILE */}
                  {tile.type === 'square-tile' && (
                    <img src={tile.image} alt="Gallery" />
                  )}

                  {/* QUOTE TILE */}
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

      <Footer />
    </div>
  );
}

export default Media;
