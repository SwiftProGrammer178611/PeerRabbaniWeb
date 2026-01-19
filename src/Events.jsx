import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Events.css'; 
import Navbar from './Components/Navbar'; 
import Footer from './Components/Footer'; 

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Failed to fetch events', err));
  }, []);

  return (
    /* min-h-screen: Page is at least as tall as the screen
       flex-col: Content flows top to bottom
       bg-black: Force the background to be jet black
    */
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      {/* flex-grow: This is the "spring". It expands to fill all empty space 
          between the title/grid and the footer, pushing the footer down.
      */}
      <main className="flex-grow pt-32 pb-20 px-4">
        <h1 className="text-center text-[#d4af37] text-5xl md:text-6xl mb-12 font-cinzel tracking-widest">
          Upcoming Events
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <div 
              className="bg-[#1a1a1a] rounded-[30px] overflow-hidden border border-[#d4af37]/20 transition-all hover:border-[#d4af37]" 
              key={event.id}
            >
              {event.image && (
                <div className="h-64 overflow-hidden">
                   <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-8 text-center">
                <h3 className="text-[#d4af37] text-3xl mb-2 font-cinzel">{event.title}</h3>
                <p className="text-gray-400 text-sm tracking-widest uppercase mb-4">{event.date}</p>
                <p className="text-gray-300 italic line-clamp-3">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer stays pinned to the bottom because of the flex-grow above */}
      <Footer />
    </div>
  );
}

export default Events;