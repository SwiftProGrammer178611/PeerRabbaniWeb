import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventManager.css';

function EventsManagementsPage() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null); // actual file
  const [preview, setPreview] = useState(null); // image preview URL
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:4000/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events', err);
    }
  };

  // Generate preview when user selects an image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const addEvent = async () => {
  if (!title || !date) {
    setError('Title and Date required');
    return;
  }

  // Temporary event for instant preview
  const tempId = Date.now();
  const tempEvent = {
    id: tempId,
    title,
    date,
    description,
    image: preview // use the local preview
  };
  setEvents(prev => [...prev, tempEvent]); // show immediately
  setTitle(''); setDate(''); setDescription(''); setImageFile(null); setPreview(null);
  setError('');

  // Upload to backend
  try {
    const formData = new FormData();
    formData.append('title', tempEvent.title);
    formData.append('date', tempEvent.date);
    formData.append('description', tempEvent.description);
    if (imageFile) formData.append('image', imageFile);

    const res = await axios.post('http://localhost:4000/events', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    // Only replace backend fields, but keep image preview if backend doesn't return it
    setEvents(prev =>
      prev.map(ev =>
        ev.id === tempId
          ? { ...res.data, image: tempEvent.image || res.data.image }
          : ev
      )
    );
  } catch (err) {
    console.error('Failed to save event', err);
    setError('Failed to save event');
  }
};


  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/events/${id}`);
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error('Failed to delete event', err);
    }
  };

  return (
    <div className="manager-container">
      <h2>Event Management</h2>
      {error && <p className="error">{error}</p>}

      <div className="event-form">
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="input-field" />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input-field" />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="input-field" />
        <input type="file" accept="image/*" onChange={handleImageChange} className="input-field" />
        <button className="add-btn" onClick={addEvent}>Add Event</button>
      </div>

      <div className="events-list">
        {events.map(e => (
          <div className="event-card" key={e.id}>
            {e.image && <img src={e.image} alt="Event" className="event-img" />}
            <div className="event-info">
              <h3>{e.title}</h3>
              <p className="event-date">{e.date}</p>
              <p className="event-desc">{e.description}</p>
            </div>
            <button className="delete-btn" onClick={() => deleteEvent(e.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsManagementsPage;
