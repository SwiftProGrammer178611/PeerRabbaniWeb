import React from 'react';
import { Link } from 'react-router-dom';

const EventsSection = () => {
  const cursiveFont = { fontFamily: "'Cizal', cursive, serif" };

  const events = [
    {
      title: "Sunday Mehfil",
      description: "Every Sunday At Khanqah E Peer E Rabbani",
      info: "",
      image: "images/Image14.JPG" 
    },
    {
      title: "Urs E Peer E Rabbani",
      description: "Date: Feb 7, 8, 9 At Khanqah E Peer E Rabbani",
      info: "",
      image: "images/Image8.JPG" 
    }
  ];

  return (
    <section className="px-4 py-16 bg-[#0b1f1d] flex flex-col items-center">
      <h2 
        className="text-5xl md:text-6xl text-center mb-12 text-[#D4AF37]" 
        style={cursiveFont}
      >
        Events
      </h2>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-stretch w-full max-w-7xl mx-auto">
        
        {events.map((event, index) => (
          <div
            key={index}
            className="group bg-white rounded-[30px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] overflow-hidden w-full max-w-[400px] mx-auto md:mx-0 flex flex-col flex-1 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="h-64 overflow-hidden shrink-0">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-8 flex flex-col items-center text-center flex-1">
              <div className="h-[120px] flex items-center justify-center w-full">
                <h3 className="text-5xl text-[#D4AF37] leading-tight" style={cursiveFont}>
                  {event.title}
                </h3>
              </div>
              <p className="text-gray-500 italic text-3xl mb-6 leading-tight flex-1" style={cursiveFont}>
                {event.description}
              </p>
              <div className="mt-auto pt-4 border-t border-gray-100 w-full">
                <p className="text-gray-400 text-[11px] tracking-widest uppercase font-light">
                  {event.info}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* POSH MOBILE ARROW: Single Continuous SVG */}
        <Link 
          to="/events" 
          className="lg:hidden w-full max-w-[400px] group/mobile flex flex-col items-center gap-4 mt-10 px-2"
        >
          <span className="text-[#D4AF37] text-2xl tracking-widest opacity-80 group-hover/mobile:opacity-100 transition-opacity" style={cursiveFont}>
            Explore All Events
          </span>
          <svg 
            viewBox="0 0 300 24" 
            fill="none" 
            className="w-full h-8 text-[#D4AF37]" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* Elegant thin line */}
            <line x1="0" y1="12" x2="298" y2="12" className="opacity-40 group-hover/mobile:opacity-100 transition-opacity duration-500" />
            {/* Minimalist Arrow Head */}
            <polyline points="290 5 298 12 290 19" className="group-hover/mobile:translate-x-1 transition-transform duration-300" />
          </svg>
        </Link>

        {/* POSH DESKTOP ARROW: Vertical floating style */}
        <Link 
          to="/events" 
          className="hidden lg:flex items-center justify-center text-[#D4AF37] hover:text-white transition-all duration-500 ml-12 group/desktop"
        >
          <div className="relative flex flex-col items-center gap-4">
            <span className="text-sm tracking-[0.3em] uppercase vertical-text opacity-0 group-hover/desktop:opacity-100 transition-all duration-500">
              More
            </span>
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="w-16 h-16 stroke-[0.5] group-hover/desktop:scale-110 transition-transform duration-500"
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default EventsSection;