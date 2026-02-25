const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(helmet());

// ✅ CORS: allow frontend on localhost:3000
app.use(cors({
  origin: process.env.FRONTEND_URL, // <-- your React app
  credentials: true               // needed if you use cookies/auth
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling
app.use(require('./middleware/errorHandler'));

// 404 handler
app.use('*', (req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));