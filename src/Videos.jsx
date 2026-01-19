import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer.jsx';

const Videos = () => {
  // Mapping the IDs to their specific layout classes to match your original look
  const videoData = [
    { id: "XEXueDqxnm4", type: "video-tile" }, 
    { id: "2_HQ7GWtUMU", type: "square-tile" },
    { id: "0kgjy3T8nd4", type: "square-tile" },
    { id: "r8p9DsjSkp0", type: "square-tile" }
  ];

  return (
    <div className="media-page-wrapper pt-16">
      <Navbar />
      
      <div className="media-container">
        <h1 className="main-title">KHANQAH E PEER RABBANI</h1>
        <p className="ornate-subtitle">Official Video Gallery</p>
        <div className="title-divider"></div>

        <div className="masonry-layout">
          {videoData.map((video) => (
            <div key={video.id} className={`masonry-item ${video.type}`}>
              {/* THE FIX: pointerEvents: 'none' stops the frame from blocking clicks */}
              <div className="ornate-frame" style={{ pointerEvents: 'none', position: 'relative' }}>
                <div className="inner-content" style={{ height: '100%', width: '100%' }}>
                  <iframe 
                    width="100%" 
                    height="100%" 
                    /* THE FIX: pointerEvents: 'auto' ensures the video IS clickable */
                    style={{ border: 0, pointerEvents: 'auto' }}
                    src={`https://www.youtube.com/embed/${video.id}?rel=0&enablejsapi=1`} 
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
          <a 
            href="https://www.youtube.com/@safeenaerabbani5769" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="youtube-link-btn"
          >
            <span className="yt-icon">▶</span>
            Visit Official YouTube Channel
          </a>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Videos;