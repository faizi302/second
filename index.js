const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// ✅ Enable the contact route here
app.use('/api/contact', require('./routes/contact'));

// (Optional) Serve frontend static files if using Vite/React build
// app.use(express.static(path.join(__dirname, './my-app/dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './my-app/dist', 'index.html'));
// });

// Simple test route
app.get('/', (req, res) => {
  res.send('Server is running! This is a test route.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
