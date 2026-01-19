import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="event-box">
      <div className="event-img-container">
        <img 
          src={event.image || "/images/placeholder.jpg"} 
          alt={event.title} 
          className="event-image" 
        />
      </div>
      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">{event.description}</p>
        <div className="event-footer-info">
          <p className="event-date">Date: {event.date}</p>
          <p className="event-location">Location: {event.location}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;