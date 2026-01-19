import React, { useRef, useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import KalaamDetails from './KalaamsDetails';
import './Kalaams.css';

function Kalaams() {
  const [apiKalaams, setApiKalaams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedKalaam, setSelectedKalaam] = useState(null);
  
  // NEW: State for search query
  const [searchQuery, setSearchQuery] = useState("");

  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const togglePlay = (index, src) => {
    if (currentIndex === index) {
      audioRef.current.pause();
      setCurrentIndex(null);
    } else {
      audioRef.current.src = src;
      audioRef.current.play().catch(e => console.error("Playback failed", e));
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    async function fetchKalaams() {
      try {
        const res = await fetch("https://kprserver.netlify.app/.netlify/functions/kalaams?type=kalaams");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setApiKalaams(data.kalaams || []);
      } catch (err) {
        console.error(err);
        setError("Could not load kalaams");
      } finally {
        setLoading(false);
      }
    }
    fetchKalaams();
  }, []);

  // NEW: Logic to filter kalaams based on search
  const filteredKalaams = apiKalaams.filter((k) =>
    k.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (k.poet && k.poet.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (selectedKalaam) {
    return <KalaamDetails kalaam={selectedKalaam} onBack={() => setSelectedKalaam(null)} />;
  }

  return (
    <div className="kalaams-page pt-32">
      <Navbar />
      <div className="container">
        <h1 className="main-title" style={{ color: '#d4af37' }}>Kalaams</h1>

        {/* NEW: Search Bar UI */}
        <div className="search-container mb-5">
          <input
            type="text"
            className="search-input"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading && <p className="text-center">Loading…</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <div className="row g-4 justify-content-center mt-3">
          {/* Use filteredKalaams here instead of apiKalaams */}
          {filteredKalaams.length > 0 ? (
            filteredKalaams.map((k, index) => (
              <div className="col-12 col-md-8" key={k.id || index}>
                <div className="kalaam-card">
                  <div className="kalaam-info" onClick={() => setSelectedKalaam(k)}>
                    <h2 className="kalaam-title">{k.title}</h2>
                    <p className="kalaam-poet">{k.poet || "Kalaam-e-Rabbani"}</p>
                  </div>
                  <div
                    className={`play-button ${currentIndex === index ? 'playing' : ''}`}
                    onClick={() => togglePlay(index, k.audio)}
                  >
                    <span>{currentIndex === index ? '❚❚' : '▶'}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && <p className="text-center opacity-50">No Kalaams found matching your search.</p>
          )}
        </div>
      </div>

      <Footer />
      <audio ref={audioRef} onEnded={() => setCurrentIndex(null)} />
    </div>
  );
}

export default Kalaams;