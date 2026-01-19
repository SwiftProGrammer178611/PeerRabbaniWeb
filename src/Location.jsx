import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import './Kalaams.css';
import Footer from './Components/Footer';
import './Events.css';

// Import your master data
import initialData from './Json Files/Location.json';

function Location() {
  const [siteData, setSiteData] = useState(initialData);
const cursiveFont = { fontFamily: "'Cinzel', cursive, serif" };
  useEffect(() => {
    const saved = localStorage.getItem('kpr_site_data');
    if (saved) {
      setSiteData(JSON.parse(saved));
    }
  }, []);

  const loc = siteData.location;
  const encodedPlace = encodeURIComponent(loc.placeName);

  // Dynamic URLs based on JSON data
  const embedSrc = `https://maps.google.com/maps?q=${encodedPlace}&t=&z=${loc.mapZoom}&ie=UTF8&iwloc=&output=embed`;
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedPlace}`;

  return (
    <div className="kalaams-page pt-32">
      <Navbar />

      <div className="container" >
        <h1 className="main-title text-center " style={{ font:cursiveFont,color: '#d4af37' }}>Location</h1>
        
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-10">
            <div className="kalaam-card flex-column text-center p-4" style={{ background: '#1a1a1a', borderRadius: '15px', border: '1px solid #d4af37' }}>
              <h2 className="kalaam-title mb-3" style={{ color: '#d4af37', fontFamily: 'serif', fontWeight: 'bold' }}>
                {loc.displayTitle}
              </h2>
              <p className="kalaam-poet" style={{ fontSize: '1.1rem', color: '#fff' }}>
                {loc.subtitle.split('\n').map((line, i) => (
                  <React.Fragment key={i}>{line}<br/></React.Fragment>
                ))}
              </p>
              
              <div className="mt-4 rounded overflow-hidden" style={{ width: '100%', height: '400px', border: '1px solid #d4af37' }}>
                <iframe
                  title="Google Maps Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  src={embedSrc}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
              
              <div className="mt-4">
                <a 
                  href={externalMapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-gold text-decoration-none"
                  style={{ 
                    fontSize: '0.9rem', 
                    display: 'inline-block', 
                    padding: '12px 24px',
                    backgroundColor: '#d4af37',
                    color: '#000',
                    borderRadius: '4px',
                    fontWeight: 'bold'
                  }}
                  
                >
                  Open in Google Maps
                </a>
                
              </div>
              
            </div>
            
          </div>
              
        </div>
        
      </div>
      <br/>
      <br/>
      <br/>

      <Footer/>
    </div>

  );
}

export default Location;