const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer'); // for file uploads
const app = express();
const PORT = 4000;

// Use JSON parser for normal requests
app.use(bodyParser.json());

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

const USERNAME = 'admin';
const PASSWORD = 'password123';
const EVENTS_FILE = './events.json';

// --- Helpers ---
function readEvents() {
  if (!fs.existsSync(EVENTS_FILE)) return [];
  return JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf-8'));
}
function writeEvents(events) {
  fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2));
}

// --- Login ---
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// --- Multer setup for image upload (memory storage for Base64) ---
const storage = multer.memoryStorage();
const upload = multer({ storage });

// --- Events endpoints ---
app.get('/events', (req, res) => {
  res.json(readEvents());
});

// Add event with optional image
app.post('/events', upload.single('image'), (req, res) => {
  const events = readEvents();

  let imageBase64 = null;
  if (req.file) {
    // convert image buffer to base64 string
    imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }

  const newEvent = {
    id: Date.now(),
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    image: imageBase64
  };

  events.push(newEvent);
  writeEvents(events);

  res.json(newEvent);
});

// Delete event
app.delete('/events/:id', (req, res) => {
  let events = readEvents();
  events = events.filter(e => e.id !== parseInt(req.params.id));
  writeEvents(events);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
