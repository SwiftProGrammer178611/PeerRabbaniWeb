import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const linksContainerRef = useRef(null);
  
  const cursiveFont = { fontFamily: "'Great Vibes', cursive, serif" };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.innerWidth < 1024) {
        if (isOpen) {
          // OPEN: Animate everything in 0.3 seconds flat
          // We use max-height for a faster "engine" start
          gsap.to(containerRef.current, { 
            maxHeight: '800px', // Large enough to fit all links
            duration: 0.3, 
            ease: "power2.out" 
          });
          
          gsap.fromTo(linksContainerRef.current?.children, 
            { opacity: 0, y: 5 }, // Reduced distance for faster feel
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.25, 
              stagger: 0.02, // Near-instant stagger
              ease: "none" // Linear feel is often perceived as faster
            }
          );
        } else {
          // CLOSE: Snap shut
          gsap.to(linksContainerRef.current?.children, { 
            opacity: 0, 
            duration: 0.15 
          });
          gsap.to(containerRef.current, { 
            maxHeight: '80px', 
            duration: 0.3, 
            ease: "power2.inOut" 
          });
        }
      }
    });
    return () => ctx.revert();
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[5000] pt-6 flex justify-center px-4">
      <div 
        ref={containerRef}
        style={{ maxHeight: '80px' }} // Controlled by GSAP
        className="relative w-full max-w-[95%] lg:max-w-[1400px] bg-black/20 backdrop-blur-xl  rounded-[35px] overflow-hidden shadow-2xl transition-all duration-300"
      >
        <div className="flex items-center justify-between px-6 lg:px-12 h-[80px] w-full shrink-0">
          
          {/* LOGO: Left */}
          

          <div className="hidden lg:flex items-center gap-12 ml-10 flex-1">
            <Link to="/kalaams" className="text-white text-2xl tracking-widest hover:text-white/70" style={cursiveFont}>Kalaams</Link>
            <Link to="/events" className="text-white text-2xl tracking-widest hover:text-white/70" style={cursiveFont}>Events</Link>
            <Link to="/videos" className="text-white text-xl hover:text-white/60" style={cursiveFont}>Videos</Link>
          </div>


<Link to="/" className="p-0.5 bg-white/90 rounded-full shadow-lg z-20 transition-transform active:scale-95">
             <img src="/images/MainLogo.png" alt="Logo" className="w-12 h-12 rounded-full object-cover" />
          </Link>
          <div className="flex items-center justify-end flex-1 gap-12">
            
            <div className="hidden lg:flex items-center gap-12">
              
              <Link to="/location" className="text-white text-2xl tracking-widest hover:text-white/70" style={cursiveFont}>Location</Link>
              <Link to="/gallery" className="text-white text-xl hover:text-white/60" style={cursiveFont}>Gallery</Link>
              <div className="relative group">
                
              </div>
            </div>

            {/* HAMBURGER: Big and Dark */}
            <div className="lg:hidden z-20">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-transparent  text-white shadow-xl"
              >
                {isOpen ? (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div ref={linksContainerRef} className="lg:hidden flex flex-col items-center gap-6 pb-12 pt-2">
          <Link to="/kalaams" className="text-white text-4xl tracking-widest" style={cursiveFont} onClick={() => setIsOpen(false)}>Kalaams</Link>
          <Link to="/events" className="text-white text-4xl tracking-widest" style={cursiveFont} onClick={() => setIsOpen(false)}>Events</Link>
          <Link to="/location" className="text-white text-4xl tracking-widest" style={cursiveFont} onClick={() => setIsOpen(false)}>Location</Link>
          
          <div className="flex flex-col items-center w-full">
             <span className="text-white text-4xl tracking-widest mb-2" style={cursiveFont}>Media</span>
             <Link to="/gallery" className="text-white/60 text-3xl tracking-widest" style={cursiveFont} onClick={() => setIsOpen(false)}>Gallery</Link>
             <Link to="/videos" className="text-white/60 text-3xl tracking-widest mt-2" style={cursiveFont} onClick={() => setIsOpen(false)}>Videos</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;