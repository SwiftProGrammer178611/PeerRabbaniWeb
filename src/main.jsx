import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Events from './Events.jsx';
import Kalaams from './Kalaams.jsx';
import Location from './Location.jsx'; 
import Media from './Media.jsx'; 
import Editor from './Editor';
import Login from './Login.jsx';
import EventManager from './EventsManagementsPage.jsx';
import Videos from './Videos.jsx';



import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

function RootRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Main app home */}
        <Route path="/" element={<App />} />

        {/* Public pages */}
        <Route path="/events" element={<Events />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/Editor" element={<Editor />} />
        <Route path="/kalaams" element={<Kalaams />} />
        <Route path="/gallery" element={<Media />} />
        <Route path="/location" element={<Location />} />
        <Route path="/videos" element={<Videos />} />

        {/* Login page */}
        <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />

        <Route path="/manage" element={isLoggedIn ? <EventManager /> : <Navigate to="/login" />} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

root.render(
  <React.StrictMode>
    <RootRouter />
  </React.StrictMode>
);
