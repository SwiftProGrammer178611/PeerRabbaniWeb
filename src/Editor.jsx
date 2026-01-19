import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import EventCard from './Components/EventCard'; 
import './Events.css'; 

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Failed to fetch events', err));
  }, []);

  return (
    <div className="events-page">
      <Navbar />
      
      <div className="events-header-container">
        <h1 className="main-title">Upcoming Events</h1>
      </div>

      {/* This container will hold the cards without squashing them */}
      <div className="events-grid-container">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Events;